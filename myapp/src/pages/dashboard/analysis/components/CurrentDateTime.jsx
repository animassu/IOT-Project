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

  //const current = new Date();
  //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const locale = 'en';
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const hour = today.getHours();

  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

  return (
    <Row gutter={24}>
      <br/>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={"Current Date and Time"}
          action={
            <Tooltip title="">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
        >
          <h1>{date + " " + time}</h1>
        </ChartCard>
      </Col>
    </Row>
  )
};

export default IntroduceRow;
