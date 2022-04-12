import { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip,Modal  } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import { useModel } from 'umi';

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
  const { initialState, setInitialState } = useModel('@@initialState');
  const [traffic, setTraffic] = useState([])
  const currentUser = initialState?.currentUser
  console.log("current user",currentUser[0])

  return (
    <Row gutter={24}>
      <br/>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={"Store Number"}
          action={
            <Tooltip title="">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
        >
          <h1>{currentUser[0].username}</h1>
        </ChartCard>
      </Col>
    </Row>
  )
};

export default IntroduceRow;