/**
 * Created by fighter on 2017/3/20.
 */

import { urlParamJoin } from './url-tools';

export function filterParam(params = {}, filter) {
  if (!filter || typeof filter === 'undefined') return params;
  if (typeof params === 'undefined') return params;
  const o = {};
  if (Array.isArray(filter)) {
    filter.forEach((key) => {
      o[key] = params[key];
    });
  } else {
    Object.keys(filter).forEach((key) => {
      o[key] = params[filter[key]];
    });
  }
  return o;
}

function formatJsonArgs({ command, params: { urlParams = '', ...params }, urlFilter }) {
  const urlParam = (typeof urlParams === 'string') ? urlParams : urlParamJoin(filterParam(urlParams, urlFilter));
  // setParamObjToUrl('', filterParam(urlParams, urlFilter));
  const o = {};
  if (urlParam.length !== 0) o.urlParams = urlParam;
  const commands = {
    command,
    params: {
      ...o,
      ...params,
    },
  };
  return JSON.stringify(commands);
}

// js 调用 native
export function callNative(args) {
  const funName = 'executeNative';
  try {
    const formatArgs = formatJsonArgs(args);
    if (typeof (android) === 'undefined') {
      window.webkit.messageHandlers[funName].postMessage(formatArgs);
    } else {
      window.android[funName](formatArgs);
    }
  } catch (e) {
    console.log(`js 调用 native${e}`);
    console.log(funName, formatJsonArgs(args));
  }
}

// native 调用 js
export function defineToNative(funName, funBody) {
  if (typeof (android) === 'undefined') {
    window[funName] = funBody;
  } else {
    window.android[funName] = funBody;
  }
}

const wrapObj = {
  http: 'http://',
  https: 'https://',
  view: 'view://',
  app: 'app://',
  msg: 'msg://',
  fail: 'fail://',
};

export function wrapArgsWithCallNative(type, interFace = '') {
  // let host = '';
  // if (type === 'http' || type === 'https') {
  //   host = window.LOCALHOST_URL;
  // }
  // return `${wrapObj[type]}${host}${interFace}`;
  return `${wrapObj[type]}${interFace}`;
}
