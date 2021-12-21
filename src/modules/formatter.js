export function formatPrice(p, padZero = false) {
  return p
    ? Number((p / 1000).toFixed(2))
        .toString()
        .replace(/(\d+)(\.?)(\d*)/, (p, p1, p2, p3) => {
          return padZero ? p1 + (p2 || ".") + p3.padEnd(2, "0") : p;
        })
    : "0.00";
}

export const formatData = (value, MUnit = "M", GUnit = "G") => {
  const mUnitValue = value / 1000;
  return mUnitValue >= 1024 ? mUnitValue / 1024 + GUnit : mUnitValue + MUnit;
};

/**
 * @param {Date|Number|String} tt 时间
 * @param {String} str 格式化字符串
 * */
export function formatDate(tt, str) {
  if (!(tt instanceof Date)) {
    tt = tt * 1;
    tt = new Date(tt);
  }
  return (
    str
      //四位年 0000 - infinite
      .replace(/yyyy/g, tt.getFullYear())
      //两位月 00-12
      .replace(
        /MM/g,
        tt.getMonth() + 1 >= 10 ? tt.getMonth() + 1 : "0" + (tt.getMonth() + 1)
      )
      //两位日 00 - 31
      .replace(/dd/g, tt.getDate() >= 10 ? tt.getDate() : "0" + tt.getDate())
      //两位小时 00 - 23
      .replace(/HH/g, tt.getHours() >= 10 ? tt.getHours() : "0" + tt.getHours())
      //两位分 00 -59
      .replace(
        /mm/g,
        tt.getMinutes() >= 10 ? tt.getMinutes() : "0" + tt.getMinutes()
      )
      //两位秒 00 - 59
      .replace(
        /ss/g,
        tt.getSeconds() >= 10 ? tt.getSeconds() : "0" + tt.getSeconds()
      )
      //显示3位毫秒 000 - 999
      .replace(/SSS/g, () => {
        const milliseconds = tt.getMilliseconds();
        return milliseconds >= 100 ? milliseconds : "00" + milliseconds;
      })
      //只显示毫秒最左一位 0-9
      .replace(/1S/g, () => {
        const milliseconds = tt.getMilliseconds();
        return parseInt(milliseconds / 100);
      })
      //优先显示一位月 0 - 12
      .replace(/M/g, tt.getMonth() + 1)
      //优先显示一位日 0 - 31
      .replace(/d/g, tt.getDate())
      //优先显示一位小时 0 - 23
      .replace(/H/g, tt.getHours())
      //优先显示一位分 0 - 59
      .replace(/m/g, tt.getMinutes())
      //优先显示一位秒0- 59
      .replace(/s/g, tt.getSeconds())
  );
}

/**
 *    返回一个表示时间长度的字符串，小时以上的单位转换为小时加到小时位置上。
 *   @param {Number}  time 时间长度
 *   @param {String}  formatStr 格式化字符串
 */
export function formatHours(time, formatStr = "HH:mm:ss") {
  const zeroTime = new Date(-28800000).getTime();
  let result = formatDate(time + zeroTime, "H:m:s:SSS").split(":");
  let days = Math.trunc(time / (1000 * 60 * 60 * 24));
  //prettier-ignore
  result[0] = Number(result[0]) + (days * 24);
  return formatStr
    .replace(/HH/g, result[0] >= 10 ? result[0] : "0" + result[0])
    .replace(/mm/g, result[1] >= 10 ? result[1] : "0" + result[1])
    .replace(/ss/g, result[2] >= 10 ? result[2] : "0" + result[2])
    .replace(/H/g, result[0])
    .replace(/m/g, result[1])
    .replace(/s/g, result[2])
    .replace(/SSS/g, () => {
      return result[3] >= 100 ? result[3] : "00" + result[3];
    })
    .replace(/1S/g, parseInt(result[3] / 100));
}

function formatDate1(date, fmt) {
  if (!date) {
    return "";
  }
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  const time = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const key in time) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = `${time[key]}`;
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : addZero(str));
    }
  }
  return fmt;

  function addZero(str) {
    return `00${str}`.substr(str.length);
  }
}
export function filterDate(value) {
  return formatDate1(value, "yyyy-MM-dd hh:mm:ss");
}
