import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getLoraData() {
  return request('http://localhost:5000/', {
    method: 'GET'
  }).then((data) => {
    return data
  }).catch((error) => {
    console.log("Error Detected", error)
  })
}
