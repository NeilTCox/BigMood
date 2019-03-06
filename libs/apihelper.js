const config = require('../config');

function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function callApi(extension, method, body={}, params={}) {
  method = method.toUpperCase();
  extension = extension.charAt(0) === '/' ? extension : `/${extension}`;
  let apiUrl = `${config.endpoint}${extension}`;
  console.log(apiUrl);
  console.log('asdfasdsd');
  console.log(params.email);
  console.log(body);
  if (!isEmpty(params)) {
    let getParams = []
    Object.keys(params).forEach(key => getParams.push(String(key)+'='+String(params[key])));
    apiUrl = apiUrl + '?' + getParams.join('&');
    console.log('paramsdfmadsfmadfmadfa')
    console.log(getParams);
    console.log(apiUrl);
  }
  fetchObject = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (method !== 'GET' && method !== 'HEAD') {
    fetchObject.body = JSON.stringify(body);
  }
  return fetch(apiUrl, fetchObject);
}
