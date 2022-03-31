import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
// import { Heatmap , TinyLine} from '@ant-design/plots';
import { Line , Heatmap } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
//import { ChartCard, Field } from './Charts';
import { useState,useEffect } from 'react';



const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};


const DemoHeatmap = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      type: 'density',
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
      legend: {
        position: 'bottom',
      },
      annotations: [
        {
          type: 'image',
          start: ['min', 'max'],
          end: ['max', 'min'],
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
      ],
    };
  
    return <Heatmap {...config} />;
  };

//   const DemoLine = () => {
//     const [data, setData] = useState([]);
  
//     useEffect(() => {
//       asyncFetch();
//     }, []);
  
//     const asyncFetch = () => {
//       fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
//         .then((response) => response.json())
//         .then((json) => setData(json))
//         .catch((error) => {
//           console.log('fetch data failed', error);
//         });
//     };
//     const config = {
//       data,
//       padding: 'auto',
//       xField: 'Date',
//       yField: 'scales',
//       xAxis: {
//         // type: 'timeCat',
//         tickCount: 5,
//       },
//     };
  
//     return <Line {...config} />;
//   };

  const DemoLine = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      yAxis: {
        label: {
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        },
      },
      legend: {
        position: 'top',
      },
      smooth: true,
      // @TODO 后续会换一种动画方式
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
    };
  
    return <Line {...config} />;
  };

  export default DemoHeatmap;
