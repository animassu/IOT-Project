import { useState, useEffect } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

import {getTrafficData} from '../service'


//https://charts.ant.design/en/examples/line/multiple#line-label

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => {

  const [traffic, setTraffic] = useState([])

  useEffect(() => {
    getTrafficData().then((data) => {
      setTraffic(data)
    })
  }, [])

  const config = {
    traffic,
    xField: 'time',
    yField: 'value',
    seriesField: 'store',
    legend: {
      position: 'top',
    },
  
    color: '#a8ddb5',
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return (
  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
    style={{
      marginTop: 32,
    }}
    title="Foot traffic"
  >
    
          <div
            style={{
              padding: '0 24px',
            }}
          >
            <Line {...config}
              forceFit
              data={traffic}
              responsive
              interactions={[
                {
                  type: 'slider',
                  cfg: {},
                },
              ]}
              legend={{
                position: 'top-center',
              }}
              
            />
          </div>

  
  </Card>
  )
};

export default OfflineData;
