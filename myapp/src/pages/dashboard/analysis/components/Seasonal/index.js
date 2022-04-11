import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';

import styles from '../../style.less';
import { getSeasonalData } from '../../service';

const BarChartDemo = () => {
 
  const [data, setData] = useState([])

  useEffect(() => {
    getSeasonalData().then((data) => {
      const seasonal = data.map((raw) => ({
        ...raw,
        counter: parseInt(raw?.counter),
        hour: raw?.hour.toString() + ":00"
    }))

    setData(seasonal)
    })
  }, [])

  const config = {
    data,
    xField: 'hour',
    yField: 'counter',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return(
    <Card
    className={styles.offlineCard}
    bordered={false}
    style={{
      marginTop: 32,
    }}
    title={<h1>Hourly Seasonal Index</h1>}
     >
        <Column {...config} />
    </Card>
  ) 
};

export default BarChartDemo;
