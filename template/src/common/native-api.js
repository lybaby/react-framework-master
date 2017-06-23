/**
 * Created by Tiny on 2017/6/9.
 */


import { callNative, defineToNative } from './message-app';

export function jumpURL(url) {
  callNative(url);
}


export function showMessage(msg) {
  defineToNative(msg);
}
