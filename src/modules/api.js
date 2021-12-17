import axios from 'axios';
import qs from 'qs';
import { Dialog } from 'vant';
import { jsonp } from 'vue-jsonp';
import { isEqual } from 'lodash-es';
import router from '@/router';

const errorHandler = new Proxy(Object.create(null), {
  get(target, code) {
    if (target[code]) return target[code];
    let msgClosed = true;
    let closeFn;
    const handler = (msg) => {
      if (msgClosed === false) {
        closeFn || closeFn();
      }
      msgClosed = false;
      closeFn = Dialog({
        beforeClose() {
          msgClosed = true;
          closeFn = null;
        },
        message: msg,
      });
    };
    target[code] = handler;
    return handler;
  },
});
const getErrorHandler = (code) => errorHandler[code];
// 计算baseUrl
const baseUrl = process.env.VUE_APP_API_PATH;

// 创建axios实例
const service = axios.create({
  // 接口开发环境还是生产环境的配置地址
  baseURL: baseUrl,
  // send cookies when cross-domain requests
  // withCredentials: true,
  // 请求超时时间
  timeout: 30000,
});

// 存储所有的请求标致和拒绝请求的方法
const pending = [];
// 这个是控制取消请求的
const { CancelToken } = axios;
// 检查且删掉同样的请求
const removePending = (config) => {
  for (const p in pending) {
    if (
      pending[p].u === `${config.url}&${config.method}`
      && isEqual(config.data || config.params, pending[p].reqData)
    ) {
      // 当前请求在数组中存在时，执行函数体
      // 执行取消操作
      pending[p].f();
      // 把这条记录从数组中移除
      pending.splice(p, 1);
    }
  }
};

// request 拦截器
service.interceptors.request.use(
  (config) => {
    // 在一个ajax发送前执行一下取消操作
    removePending(config);
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        u: `${config.url}&${config.method}`,
        f: c,
        reqData: config.data || config.params,
      });
    });
    return config;
  },
  (error) => Promise.reject(error),
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中删除
    removePending(response.config);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    if (response.data.code !== 0) {
      // if (response.data.code === 1000) {
      //   router.replace({
      //     path: '/login',
      //   });
      // }
      const errorHandler = getErrorHandler(response.data.code);
      errorHandler(response.data.message);
      const error = new Error();
      Object.assign(error, response.data);
      error.message = response.data.message;
      error.response = response;
      return Promise.reject(error);
    }
    return response;
  },
  (error) => {
    const messages = {
      500: 'Server exception ',
      401: 'No access ',
      404: 'The request path does not exist!',
    };
    const status = error.response || error.response.status;
    // 错误提醒
    switch (status) {
      case 500:
      case 401:
      case 404:
        Dialog({
          message: messages[status],
        });
        break;
      default:
        Dialog({
          message: 'Request service exception'
        });
        break;
    } // 错误提醒
    error.message = status ? messages[status] : error.message;
    return Promise.reject(error);
  },
);

export default {
  get(url, params, loading = {}) {
    return service({
      method: 'get',
      url,
      params,
      loading,
    }).then((res) => res.data);
  },
  postJSON(url, data, loading = {}, headers = {}, options) {
    return service({
      method: 'post',
      url,
      data,
      loading,
      // 设置请求头
      headers,
      ...options,
    }).then((response) => response.data);
  },
  post(
    url,
    data,
    loading = {},
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    options,
  ) {
    return service({
      method: 'post',
      url,
      // 将请求数据转为application/x-www-form-urlencoded
      data: qs.stringify(data),
      loading,
      // 设置请求头
      headers,
      ...options,
    }).then((response) => response.data);
  },
  form(url, formdata) {
    return service({
      method: 'post',
      url,
      data: formdata,
    }).then((response) => response.data);
  },
  jsonp,
};
