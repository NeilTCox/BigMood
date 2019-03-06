function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function callApi(url, method, body={}, params={}) {
  method = method.toUpperCase();
  let apiUrl = url;
  if (!isEmpty(params)) {
    let getParams = []
    Object.keys(params).forEach(key => getParams.push(String(key)+'='+String(params[key])));
    apiUrl = apiUrl + '?' + params.join('&');
    console.log(url);
  }
  fetchObject = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (method === 'GET' || method === 'HEAD') {
    fetchObject.body = JSON.stringify(body);
  }
  return fetch(apiUrl, fetchObject);
}
