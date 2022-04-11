import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';

import styles from '../../style.less';

const BarChartDemo = () => {
  const data = [
    {
      type: 'Monday',
      sales: 38,
    },
    {
      type: 'Tuesday',
      sales: 52,
    },
    {
      type: 'Wedensday',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
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
    title={<h1>Weekly Seasonal Index</h1>}
     >
        <Column {...config} />
    </Card>
  ) 
};

export default BarChartDemo;
