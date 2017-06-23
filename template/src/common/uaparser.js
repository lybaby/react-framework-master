/**
 * Created by Amg on 2017/2/22.
 * Changed by Tiny on 2017/6/9
 */
/* eslint import/prefer-default-export:off */

const systemInfo = {
  isIpad: 'ipad',
  isIphoneOs: 'iphone os',
  isMidp: 'midp',
  isUc7: 'rv:1.2.3.4',
  isUc: 'ucweb',
  isAndroid: 'android',
  isCE: 'windows ce',
  isWM: 'windows mobile',
  isWeiXin: 'micromessenger'
};

class UserAgent {
  ua = navigator.userAgent.toLowerCase();
  s = {};

  constructor() {
    Object.keys(systemInfo).forEach((i) => {
      this.s[i] = this.ua.includes(systemInfo[i]);
    });
  }

  isIOS() {
    return (this.s.isIpad || this.s.isIphoneOs);
  }

  isAndroid() {
    return (this.s.isMidp || this.s.isUc7 || this.s.isUc || this.s.isAndroid);
  }

  isCustomerSystem() {
    return this.ua.indexOf(CUSTOMER_FLAG) !== -1;
  }
  
  isWeiXin() {
    return this.ua.match(/MicroMessenger/i) === systemInfo.isWeiXin;
  }
  
  isMobile() {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/);
  }

}

const gUserAgent = new UserAgent();

export { gUserAgent };
