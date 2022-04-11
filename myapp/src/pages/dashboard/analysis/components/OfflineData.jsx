import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Area } from '@ant-design/charts';
import styles from '../style.less';
import { useModel } from 'umi';

import {getTrafficData} from '../service'


//https://charts.ant.design/en/examples/line/multiple#line-label

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [traffic, setTraffic] = useState([])
  const currentUser = initialState?.currentUser

  useEffect(() => {
    getTrafficData(currentUser[0]).then((data) => {
      const trafficData = data.map((raw) => ({
        ...raw,
        hour: raw?.hour.toString() + ":00"
    }))
      setTraffic(trafficData)
    })
  }, [])

  const config = {
    traffic,
    xField: 'hour',
    yField: 'counter',
  
    color: '#a8ddb5',
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
    title={<h1>Today's Hourly Foot Traffic</h1>}
  >
      <div
        style={{
          padding: '0 24px',
        }}
      >
        <Area {...config}
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
