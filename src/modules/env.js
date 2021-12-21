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
  const { origin, search, pathname } = window.location;
  const isMobileUrl = new RegExp('/m/').test(pathname);
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
    if (!isMobileUrl) {
      let replacePathNameArr = pathname.split('/');
      let index = replacePathNameArr.findIndex(item => item === 'magento');
      replacePathNameArr.splice(index + 1,0,'m');
      let replacePathNameRes = replacePathNameArr.join('/');
      window.location.href = `${origin}${replacePathNameRes}${search}`;
    }
  } else {
    if (isMobileUrl) {
      let replacePathNameArr = pathname.split('/');
      let resultArr = replacePathNameArr.filter(item => item !== 'm');
      let replacePathName = resultArr.join('/');
      window.location.href = `${origin}${replacePathName}${search}`;
    }
    
  }
}

export default {
  isIos,
  isAndroid,
  isXL,
  osCode,
  browserRedirect
};
