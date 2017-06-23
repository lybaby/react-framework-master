/**
 * Created by Amg on 2017/2/22.
 */

import ReactDOM from 'react-dom';

// 是否为数组
// export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object') return false;
  return Object.keys(obj).length <= 0;
}
export function insertComponent(component) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(component, el);
  return el;
}

export function removeComponentByRef(ref) {
  const p = ref.parentNode;
  ReactDOM.unmountComponentAtNode(p);
  p.parentNode.removeChild(p);
}

export function dateAddSeconds(sec) {
  return new Date((new Date()).getTime() + (sec * 1000));
}

export function addFavorite(url = window.location.href, title = window.document.title) {
  if (window.external && 'addFavorite' in window.external) { // IE
    window.external.addFavorite(url, title);
  } else if (window.sidebar && window.sidebar.addPanel) { // Firefox23后被弃用
    window.sidebar.addPanel(url, title);
  } else if (window.opera && window.print) { // rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
    this.title = title;
    return true;
  } else { // webkit - safari/chrome
    alert(`请按下快捷键 ${(navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL')}+D 以添加此页面至收藏夹!`);
  }
  return false;
}

export function arrayFromStep(start, end, step = 1) {
  const arr = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}

export function combineArray(keys, values) {
  if (!keys || !values) return [];
  return keys.map((key, idx) => ({ name: key, value: values[idx] }));
}

export function safeGetKey(key, obj) {
  return key.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

export function pagination(currentPageNum, maxPageNum, delta = 2) {
  const left = currentPageNum - delta;
  const right = currentPageNum + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= maxPageNum; i += 1) {
    if (i === 1 || i === maxPageNum || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let j = 0, len = range.length; j < len; j += 1) {
    const num = range[j];
    if (l) {
      if (num - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (num - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(num);
    l = num;
  }

  return rangeWithDots;
}

export function safeGetParameter(param, key) {
  if (!param) return null;
  if (typeof param === 'object' && param.length !== 0 && typeof key !== 'undefined') {
    return param[key];
  } else if (typeof param === 'string') {
    return param;
  }
  alert('错误格式化！');
  return null;
}

// 数组转换对象(二维数组转换后，value依旧为array)
// ex: [['a','b']] -> [a:['a', 'b']]
// ex: [{a:'a',b:'b'}] -> [a:{a:'a', b:'b'}]
export function arrayToObject(data, key) {
  return data.reduce((obj, product) => {
    const o = obj;
    if (Array.isArray(product)) {
      o[product[key]] = [...product];
    } else {
      o[product[key]] = { ...product };
    }
    return obj;
  }, {});
}

export function eventListener(elements, options, listenerDirect = 'add') {
  if (typeof options === 'undefined' || !Array.isArray(options)) {
    alert('添加监听事件格式错误！');
    return null;
  }

  const els = Array.isArray(elements) ? elements : [elements];
  const opts = Array.isArray(options[0]) ? options : [options];

  // return opts.forEach(item => {
  //   elements[`${listenerDirect}EventListener`](...item);
  // });

  return els.forEach(el => opts.forEach(item => {
    if (el) el[`${listenerDirect}EventListener`](...item);
  }));
}

export function saveLocalStorage(key, data) {
  localStorage[key] = data;
  return data;
}

// 获取cookie返回obj
export function getLocalStorage() {
  return JSON.parse(localStorage.data);
}

export function formDateToObject(formName) {
  const form = document.getElementById(formName);
  const input = form.getElementsByTagName('input');
  const select = form.getElementsByTagName('select');
  const data = {};
  for (let i = 0; i < input.length; i++) {
    data[input[i].name] = input[i].value;
  }
  for (let i = 0; i < select.length; i++) {
    data[select[i].name] = select[i].value;
  }
  // console.log(data);
  return data;
}

export function getPixelRatio(context) {
  const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}

export function getConvertUnit(number) {
  const w = 10000;
  if (number < w) {
    return `${number}`;
  }
  return `${(number / w).toFixed(2)}万`;
}

// 用于转换股票数单位，每100股等于一手
export function stockNumHandler(num) {
  if ((parseFloat(num) < 10000000000) && (parseFloat(num) >= 1000000)) {
    const stockNum = parseFloat(num) / 1000000;
    return `${stockNum.toFixed(2)}万`;
  }
  if (parseFloat(num) >= 10000000000) {
    const stockNum = parseFloat(num) / 10000000000;
    return `${stockNum.toFixed(2)}亿`;
  }
  return (num / 100).toFixed(0);
}

function randomIP() {
  let num = (Math.random() * 255) + 1;
  num = parseInt(num, 10);
  return num;
}

export function createIP() {
  const ip = `${randomIP()}.${randomIP()}.${randomIP()}.${randomIP()}`;
  return ip;
}

