/**
 * Created by Amg on 2017/2/14.
 */
// 获取地址栏所有参数转换为对象
export function getParamObjFromUrl() {
  let str = location.href; // 取得整个地址栏
  const num = str.indexOf('?');
  str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]
  const arr = str.split('&'); // 各个参数放到数组里
  const paramData = {};
  for (let i = 0; i < arr.length; i += 1) {
    const n = arr[i].indexOf('=');
    if (n > 0) {
      const name = arr[i].substring(0, n);
      const value = decodeURIComponent(arr[i].substr(n + 1));
      paramData[name] = value;
    }
  }
  return paramData;
}

// 把参数对象合并生成url
export function setParamObjToUrl(opt = {}, url = '') {
  if (typeof url !== 'string') return null;
  let urlPro = '';
  let urlEnd = '';
  if (url !== '') {
    urlPro = url.startsWith('http') ? '' : 'http://';
    urlEnd = '?';
  }
  const completeUrl = `${urlPro}${url}${urlEnd}`;
  const options = Object.keys(opt).reduce((arr, obj) => [...arr, `${obj}=${opt[obj]}`], []);
  return `${completeUrl}${options.join('&')}`;
}

export function urlParamJoin(obj) {
  let paramString = '';
  Object.keys(obj).forEach(key => {
    if (paramString !== '') {
      paramString += '&';
    }
    paramString += `${key}=${obj[key]}`;
  });
  return paramString;
}
