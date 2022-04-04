import { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip,Modal  } from 'antd';
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

function error() {
  Modal.error({
    title: 'Loading of Data fail',
    content: 'Data fail to load, please try again.',
    onOk() {

    },
  });
}

//here is for the card to display number of people to visit
const IntroduceRow = ({ loading, visitData }) => {

  const [traffic, setTraffic] = useState([])

  useEffect(() => {
    getLastTrafficData().then((data) => {
      if(data == false){
        error()
      }else{
        setTraffic(data)
      }
    })
  }, [])

  return (
    <Row gutter={24}>
      <br/>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={"Total Number of Visits for this hour at " + traffic.time}
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
    </Row>
  )
};

export default IntroduceRow;
