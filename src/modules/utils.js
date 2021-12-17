import clonedeep from "lodash.clonedeep";

/**
 *   @param unparsedValue {Object|String} JSON或可被JSON.parse()解析的primitive值
 *   @return {Object}
 */
export const deepJSONParse = unparsedValue => {
  unparsedValue = clonedeep(unparsedValue);
  return (function parse(json) {
    if (!json) {
      //"" null undefined 0
      return json;
    }
    if (typeof json !== "object") {
      try {
        let value = JSON.parse(json);
        if (typeof value === "number" || typeof json === "number") {
          //number
          return json;
        }
        if (typeof value === "string") {
          value = parse(value);
        }
        json = value;
      } catch (e) {
        //不可再解析的string
        return json;
      }
    }
    Object.entries(json).forEach(([key, value]) => {
      if (value) {
        json[key] = parse(value);
      }
    });
    return json;
  })(unparsedValue);
};

/**
 *   @param source {Object}  要进行匹配的对象
 *   @param map  {Map}   匹配样板Map
 */
export const getMatchValue = (source, map) => {
  for (let key of map.keys()) {
    //当key为函数时
    if (key instanceof Function) {
      if (key(source)) {
        return map.get(key);
      }
      continue;
    }
    //当key为对象时
    if (
      Object.entries(key).every(([key, value]) => {
        return (
          value === source[key] ||
          value === (source[key] instanceof Function ? source[key]() : !value)
        );
      })
    ) {
      return map.get(key);
    }
  }
};

export const objectIncludes = (source, another) => {
  return Object.entries(another).every(([key, value]) => {
    return source.hasOwnProperty(key) && source[key] === value;
  });
};

/**
 *   这个函数是为了在ios使 :active选择器生效
 *   @param {Element} ele dom
 *   @return {undefined}
 */
export function dispatchActiveSelector(ele) {
  ele.addEventListener("touchstart", function() {});
}

export const passedTImeCount = ({ serverTime, cb }) => {
  const initialTime = Date.now();
  const fn = () => {
    const passedTime = Date.now() - initialTime + serverTime;
    const timer = setTimeout(fn, 50);
    cb(passedTime, () => clearTimeout(timer));
  };
  fn();
};

export const remainTimeCount = ({ serverTime, endTime, cb }) => {
  return new Promise(resolve => {
    passedTImeCount({
      serverTime,
      cb: (passedTIme, clearCount) => {
        let remainTime = endTime - passedTIme;
        if (remainTime <= 0) {
          remainTime = 0;
          clearCount();
          resolve();
        }
        cb(remainTime);
      }
    });
  });
  /*const initialTime = Date.now();
  return new Promise(resolve => {
    const fn = () => {
      let remainTime = endTime - (Date.now() - initialTime + serverTime);
      if (remainTime <= 0) {
        remainTime = 0;
        resolve();
      } else {
        setTimeout(fn, 50);
      }
      cb(remainTime);
    };
    fn();
  });*/
};

// 对象深拷贝
export function cloneDeep(obj) {
  let objNew = obj instanceof Array ? [] : {};
  if (typeof obj === "object") {
    for (let i in obj) {
      objNew[i] = typeof obj[i] === "object" ? cloneDeep(obj[i]) : obj[i];
    }
    return objNew;
  } else {
    return obj;
  }
}

// localStorage操作
export const getItem = NAME => {
  let result;
  if (!NAME) {
    return false;
  }
  result = localStorage.getItem(NAME);
  return result ? JSON.parse(result) : undefined;
};
export const setItem = (NAME, arr) => {
  let result, oldRes, value;
  if (!NAME || arr.length === 0) {
    return false;
  }
  const oldUsrInfo = localStorage.getItem(NAME);
  oldRes = JSON.parse(oldUsrInfo) || [];
  // 查重
  const listMap = {};
  oldRes.forEach(item => {
    listMap[item.value] = true;
  });
  let filterObj = arr.filter(item => {
    if (!listMap[item.value]) {
      return true;
    } else {
      value = item.value;
      return false;
    }
  });
  if (filterObj.length === 0) {
    const i = oldRes.findIndex(v => v.value === value);
    if (i > -1) {
      oldRes.splice(i, 1);
    }
    filterObj = arr;
  }
  const newUsrInfo = [...filterObj, ...oldRes];
  result = localStorage.setItem(NAME, JSON.stringify(newUsrInfo));
  return result;
};
export const removeItem = NAME => {
  if (!NAME) {
    return false;
  }
  localStorage.removeItem(NAME);
};
// 两个对象是否一致
export function isSame(o1, o2, compare) {
  if (o1 === o2) {
    return true;
  }
  let keys1 = Object.keys(o1);
  let keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // 计算相等的属性个数
  let sameParamLen = 0;
  keys1.forEach(prop => {
    if (compare) {
      compare(o1[prop], o2[prop], prop) && sameParamLen++;
    } else {
      o1[prop] === o2[prop] && sameParamLen++;
    }
  });
  if (sameParamLen !== keys2.length) {
    return false;
  }
  return true;
}
// 滚动到顶部
export const goPost = () => {
  let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
  let step = distance / 30; //每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step;
      window.scrollTo(0, distance);
      setTimeout(jump, 10);
    }
  })();
};
