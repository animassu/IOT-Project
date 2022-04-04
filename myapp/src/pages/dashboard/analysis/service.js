import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getTrafficData() {
  return request('http://localhost:5000/data', {
    method: 'GET'
  }).then((data) => {
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
    return false
  })
}

export async function getLastTrafficData() {
  return request('http://localhost:5000/last', {
    method: 'GET'
  }).then((data) => {
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
    return false
  })
}
