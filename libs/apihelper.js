const config = require('../config');

function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function callApi(extension, method, body={}, params={}) {
  method = method.toUpperCase();
  extension = extension.charAt(0) === '/' ? extension : `/${extension}`;
  let apiUrl = `${config.endpoint}${extension}`;
  if (!isEmpty(params)) {
    let getParams = []
    Object.keys(params).forEach(key => getParams.push(String(key)+'='+String(params[key])));
    apiUrl = apiUrl + '?' + getParams.join('&');
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
  return fetch(apiUrl, fetchObject)
    .then(function(res) {
      return res.json().then(function(data) {
        return data;
      });
    });
}

export function callFitApi(extension, method, body={}, params={}) {
  method = method.toUpperCase();
  extension = extension.charAt(0) === '/' ? extension : `/${extension}`;
  let apiUrl = `${config.fitEndpoint}${extension}`;
  if (!isEmpty(params)) {
    let getParams = []
    Object.keys(params).forEach(key => getParams.push(String(key)+'='+String(params[key])));
    apiUrl = apiUrl + '?' + params.join('&');
  }
  fetchObject = {
    method,
    headers: {
      Accept: 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
      'Authorization': `Bearer ${config.apikey}`,
    },
  }
  if (method !== 'GET' && method !== 'HEAD') {
    fetchObject.body = JSON.stringify(body);
  }
  return fetch(apiUrl, fetchObject)
    .then(function(res) {
      return res.json().then(function(data) {
        return data;
      });
    });
}
