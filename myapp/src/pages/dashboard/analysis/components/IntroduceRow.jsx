import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
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

const numOfPeople = 5000 //assuming this is the data from server

const visitDataTemp = {
  
}

const data = [
  //can organise into no. of visit per day
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
];

//here is for the card to display number of people to visit
const IntroduceRow = ({ loading, visitData }) => (
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
        total={numeral(numOfPeople).format('0,0')}
        footer={<Field label="Today Visits" value={numeral(1234).format('0,0')} />}
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
          data={data}
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
);

export default IntroduceRow;
