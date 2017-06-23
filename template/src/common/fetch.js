/**
 * Created by Tiny on 2017/6/9.
 */


export default async (type = 'GET', url = '', data = {}, method = 'fetch') => {
  const newType = type.toUpperCase();
  let newUrl = url;
  if (newType === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`;
    });
  
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      newUrl = `${newUrl}?${dataStr}`;
    }
  }


  if (window.fetch && method === 'fetch') {
    const requestConfig = {
      method: newType,
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      cache: 'force-cache',
    };
    if (newType === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      });
    }
    try {
      const response = await fetch(newUrl, requestConfig);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      //throw new Error(error);
    }
  } else {
    const responseJson = new Promise((resolve, reject) => {
      let xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
       // xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      let sendData = '';
      if (newType === 'POST') {
        sendData = JSON.stringify(data);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            let response = null;
            try {
              response = JSON.parse(xhr.responseText);
            } catch (e) {
              reject(e);
            }
            if (response) {
              resolve(response, xhr.status, xhr);
            }
          } else {
            reject(xhr);
          }
        }
      };
      xhr.open(newType, newUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(sendData);
    });
    return responseJson;
  }
};
