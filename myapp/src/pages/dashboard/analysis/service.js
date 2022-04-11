import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getTrafficData(user) {
  console.log(user)
  return request(`http://localhost:5000/data/${user.username}`, {
    method: 'GET'
  }).then((data) => {
    console.log("Taffic Data", data)
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
    return false
  })
}

export async function getLastTrafficData(user) {
  return request(`http://localhost:5000/last/${user.username}`, {
    method: 'GET'
  }).then((data) => {
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
    return false
  })
}

export async function getSeasonalData(user) {
  return request(`http://localhost:5000/seasonal/${user.username}`, {
    method: 'GET'
  }).then((data) => {
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
    return false
  })
}

export async function getHeatMap() {
  return request('http://localhost:5000/heatmap', {
    method: 'GET'
  })
}
