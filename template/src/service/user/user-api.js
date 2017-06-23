/**
 * Created by Tiny on 2017/6/9.
 */

import fetch from '../../common/fetch';
import * as Types from './api-types';

const concatString = (str) => (`user_api/${str}`);


export default class UserAPIInfo {
  static userLogin(obj = {}) {
      return fetch('POST', concatString(Types.USER_LOGIN), obj);
  }

  static fetchCaptcha(obj = {}) {
      return fetch('POST', concatString(Types.FETCH_CAPTCHA), obj);
  }

  static getUserInfo(obj = {}) {
    return fetch('POST', concatString(Types.GET_USER_INFO), obj);
  }

  static setNickName(obj = {}) {
    return fetch('POST', concatString(Types.SET_NICK_NAME), obj);
  }


}
