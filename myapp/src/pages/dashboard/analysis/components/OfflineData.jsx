import { Card, Col, Row, Tabs } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row
    gutter={8}
    style={{
      width: 138,
      margin: '8px 0',
    }}
  >
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle="转化率"
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name ? 'light' : undefined}
      />
    </Col>
    <Col
      span={12}
      style={{
        paddingTop: 36,
      }}
    >
      <RingProgress forceFit height={60} width={60} percent={data.cvr} />
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const data = [
  {store: "testing", time: '8am', value: 10 }, //x - time , y: foot
  {store: "testing", time: '9am',value: 15 }, 
  { store: "testing",time: '10am', value: 0 }, //x - time , y: foot
  { store: "testing",time: '11am', value: 15 }, //x - time , y: foot
  {store: "testing", time: '12pm',value: 30 }, 
  { store: "testing",time: '1pm', value: 20 }, //x - time , y: foot
  { store: "testing",time: '2pm',value: 40 }, 
  { store: "testing",time: '3pm',value: 40 }, 
  {store: "testing", time: '4pm',value: 30 }, 
  {store: "testing", time: '5pm',value: 20 }, 
  { store: "testing",time: '6pm',value: 65 }, 
  { store: "testing",time: '7pm',value: 35 }, 
  { store: "testing",time: '8pm',value: 17 }, 
  { store: "testing",time: '9pm',value: 19 }, 

  {store: "testing3", time: '8am', value: 5 }, //x - time , y: foot
  {store: "testing3", time: '9am',value: 10 }, 
  { store: "testing3",time: '10am', value: 15 }, //x - time , y: foot
  { store: "testing3",time: '11am', value: 25 }, //x - time , y: foot
  {store: "testing3", time: '12pm',value: 40 }, 
  { store: "testing3",time: '1pm', value: 45 }, //x - time , y: foot
  { store: "testing3",time: '2pm',value: 51 }, 
  { store: "testing3",time: '3pm',value: 60 }, 
  {store: "testing3", time: '4pm',value: 20 }, 
  {store: "testing3", time: '5pm',value: 10 }, 
  { store: "testing3",time: '6pm',value: 15 }, 
  { store: "testing3",time: '7pm',value: 45 }, 
  { store: "testing3",time: '8pm',value: 47 }, 
  { store: "testing3",time: '9pm',value: 59 }, 
];

const config = {
  data,
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

//https://charts.ant.design/en/examples/line/multiple#line-label

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => (
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
              data={data}
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
);

export default OfflineData;
