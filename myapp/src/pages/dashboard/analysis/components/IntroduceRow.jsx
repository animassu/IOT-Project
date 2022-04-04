import { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';

import {getLastTrafficData} from '../service'

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


//here is for the card to display number of people to visit
const IntroduceRow = ({ loading, visitData }) => {

  const [traffic, setTraffic] = useState([])

  useEffect(() => {
    getLastTrafficData().then((data) => {
      setTraffic(data)
    })
  }, [])

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="Total Number of Visits for this week"
          action={
            <Tooltip title="">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(traffic.value).format('0,0')}
          contentHeight={46}
        >
          {/* graph here */}
          <TinyArea
            color="#975FE4"
            xField="x"
            height={46}
            forceFit
            yField="y"
            smooth
          />
        </ChartCard>
      </Col>
      {/* <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="运营活动效果(sales?)"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <Trend
                flag="up"
                style={{
                  marginRight: 16,
                }}
              >
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <Progress
            height={46}
            percent={0.78}
            color="#13C2C2"
            forceFit
            size={8}
            marker={[
              {
                value: 0.8,
                style: {
                  stroke: '#13C2C2',
                },
              },
            ]}
          />
        </ChartCard>
      </Col> */}
    </Row>
  )
};

export default IntroduceRow;
