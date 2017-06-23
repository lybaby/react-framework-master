import * as ActionTypes from './action-types';
import UserInfo from '../service/user-data';

// 初始化获取用户所有数据
export function requestGetUserInfo() {
  return {
    type: ActionTypes.REQUEST_GET_USER_INFO,
  };
}
export function successGetUserInfo(data) {
  return {
    type: ActionTypes.SUCCESS_GET_USER_INFO,
    data
  };
}
export function errorGetUserInfo() {
  return {
    type: ActionTypes.ERROR_GET_USER_INFO,
  };
}
export function toGetUserInfo(step = 0) {
  return function wrap(dispatch) {
    dispatch(requestGetUserInfo());
    return UserInfo.getUserInfo(step)
      .then(rs => {
        dispatch(successGetUserInfo(rs));
      })
      .catch(e => {
        console.log(e);
        dispatch(errorGetUserInfo(e));
      });
  };
}
