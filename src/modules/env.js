export function isIos() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

export function isAndroid() {
  return /(Android|Linux)/i.test(navigator.userAgent);
}

export function isXL() {
  return /XLMessenger/i.test(navigator.userAgent);
}

export const osCode = isIos() ? 2 : 1;

export function browserRedirect() {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  const bIsMidp = sUserAgent.match(/midp/i) == "midp";
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  const bIsAndroid = sUserAgent.match(/android/i) == "android";
  const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    let search = window.location.search;
    let host = process.env.VUE_APP_API;
    window.location.href = `${host}`;
  } else {
    window.location = "PC端网站地址";
  }
}

export default {
  isIos,
  isAndroid,
  isXL,
  osCode
};
