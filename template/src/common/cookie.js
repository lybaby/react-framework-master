/**
 * Created by Amg on 2017/2/22.
 */

import cookie from 'cookie';

// const cookie = 't';

// 增加时间秒数
export function dateAddSeconds(sec) {
  return new Date((new Date()).getTime() + (sec * 1000));
}

// cookie处理
export class Cookie {
  static setCookie(name, val, option) {
    const v = (typeof val === 'string') ? val : JSON.stringify(val);
    document.cookie = cookie.serialize(name, v, option);
  }

  static setCookieExpireInSecond(name, val, second, option) {
    Cookie.setCookie(name, val, { expires: dateAddSeconds(second), ...option });
  }

  static getCookie(cName) {
    const p = cookie.parse(document.cookie);
    if (cName in p) {
      return p[cName];
    }
    return null;
  }

  static getJSONCookie(cName) {
    return JSON.parse(Cookie.getCookie(cName));
  }

  static deleteCookie(cName) {
    Cookie.setCookie(cName, '', { maxAge: -1 });
  }
}
