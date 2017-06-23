import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from './action-types';

const initAppState = {
  idKind: 1,
  isShowAttention: false,
  useInfo: ''
};

function appState(state = initAppState, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_GET_USER_INFO: {
      const { userInfo, name } = action.data;

      const userInfoObj = userInfo;
      console.log({
        ...state,
        ...userInfoObj,
        name,
        sessionUserId: action.sessionUserId,
      });
      return {
        ...state,
        ...userInfoObj,
        sessionUserId: action.sessionUserId,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ appState, routing: routerReducer });
