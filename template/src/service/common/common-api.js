/**
 * Created by Tiny on 2017/6/9.
 */

import fetch from '../common/fetch';

export default class UserDataInfo {
  static getUserInfo() {
    return fetch('POST', '/publish/findPulishItems', {
    });
    //  return fetch('GET', '/shopping/v1/restaurants/search', {
   //   });
    /*  return fetch('POST', 'http://121.35.249.14:9003/user_api/valid_phone', {
          phoneNum: '18576410425'
      });*/
  }
}
