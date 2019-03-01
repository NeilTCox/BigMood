function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function callApi(url, method, body={}, params={}) {
  let apiUrl = url
  if (!isEmpty(params)) {
    let getParams = []
    Object.keys(params).forEach(key => getParams.push(String(key)+'='+String(params[key])));
    apiUrl = apiUrl + '?' + params.join('&');
    console.log(url);
    body = {};
  }
  console.log(apiUrl);
  return fetch(apiUrl, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
