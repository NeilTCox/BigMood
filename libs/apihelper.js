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
    apiUrl = apiUrl + '?' + getParams.join('&');
  }
  fetchObject = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export function getDailySteps(date) {
  const startTime = date.getTime();
  return callFitApi('/users/me/dataset:aggregate', 'POST', {
    "aggregateBy": [{
      "dataTypeName": "com.google.step_count.delta",
      "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    }],
    "bucketByTime": { "durationMillis": 86400000 },
    "startTimeMillis": startTime,
    "endTimeMillis": startTime + 86400000
  }, {})
  .then((data) => {
    return {
      stepCount: data.bucket[0].dataset[0].point[0].value[0].intVal,
      date: new Date(parseInt(data.bucket[0].startTimeMillis))
    }
  });
}

// export function getDailySleep(date) {
//   const startTime = date.getTime();
//   return callFitApi('/users/me/sessions', 'GET', {}, {})
//   .then((data) => {
//     console.log(data);
//     // return {
//     //   stepCount: data.bucket[0].dataset[0].point[0].value[0].intVal,
//     //   date: new Date(parseInt(data.bucket[0].startTimeMillis))
//     // }
//   });
// }

export function sendPastWeekStepData() {
  let current = new Date(currentDate());
  for (let i = 1; i <= 7; ++i) {
    current.setDate(current.getDate()-1)
    getDailySteps(current)
    .then((data) => {
      callApi('/health/create', 'POST', {
        date: data.date,
        info: {
          steps: data.stepCount,
          sleep: 8
        },
        email: config.email
      }, {})
    });
  }
}

function currentDate() {
  return new Date(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
}

