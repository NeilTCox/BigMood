const config = require('../config');

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

export async function callFitApi(extension, method, body={}, params={}) {
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
  const res = await fetch(apiUrl, fetchObject)
  return await res.json()
}

export async function getDaySteps(date) {
  const startTime = date.getTime();
  const data = await callFitApi('/users/me/dataset:aggregate', 'POST', {
    "aggregateBy": [{
      "dataTypeName": "com.google.step_count.delta",
      "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    }],
    "bucketByTime": { "durationMillis": 86400000 },
    "startTimeMillis": startTime,
    "endTimeMillis": startTime + 86400000
  }, {}).catch((err) => {
    return undefined
  });
  if (!data || data.error) {
    return undefined;
  }
  console.log(data)
  if (data.bucket[0].dataset[0].point.length === 0) {
    return 0;
  }
  return data.bucket[0].dataset[0].point[0].value[0].intVal
}

export async function getDaySleep(date) {
  let startTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`+'T01:00:00Z'
  date.setDate(date.getDate()+1);
  let endTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`+'T01:00:00Z'
  const googleRes = await callFitApi('/users/me/sessions', 'GET', {}, { startTime, endTime }).catch((err) => undefined);
  if (googleRes !== undefined && !googleRes.error) {
    let hours = 0;
    for (act of googleRes.session) {
      if (act.activityType === 72) {
        let millisDiff = parseInt(act.endTimeMillis) - parseInt(act.startTimeMillis);
        hours += (millisDiff / (1000 * 60 * 60)).toFixed(1)
      }
    }
    return hours;

  } else {
    return undefined
  }
}

export async function getDayHealth(date) {
  let steps = await getDaySteps(date)
  let sleep = await getDaySleep(date)
  if (steps === undefined) {
    steps = 2000
  }
  if (sleep === undefined) {
    sleep = 8
  }
  return { steps, sleep }
}

export async function getTodayHealth() {
  const current = new Date()
  current.setDate(current.getDate()-1)
  return await getDayHealth(current)
}

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

function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
