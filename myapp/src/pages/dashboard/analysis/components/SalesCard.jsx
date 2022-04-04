import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { Column } from '@ant-design/charts';
import numeral from 'numeral';
import styles from '../style.less';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const rankingListData = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `no need can remove`,
    total: 323234,
  });
}

const DemoColumn = () => {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
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
        autoFit: true
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
  return <Column {...config} />;
};

// const SalesCard = ({
//   rangePickerValue,
//   salesData,
//   isActive,
//   handleRangePickerChange,
//   loading,
//   selectDate,
// }) => (
//   <Card
//     loading={loading}
//     bordered={false}
//     bodyStyle={{
//       padding: 0,
//     }}
//   >
//     <div className={styles.salesCard}>
//       <Tabs
//         tabBarExtraContent={
//           <div className={styles.salesExtraWrap}>
//             <div className={styles.salesExtra}>
//               <a className={isActive('today')} onClick={() => selectDate('today')}>
//                 Today
//               </a>
//               <a className={isActive('week')} onClick={() => selectDate('week')}>
//                 This Week
//               </a>
//               <a className={isActive('month')} onClick={() => selectDate('month')}>
//                 This Month
//               </a>
//               <a className={isActive('year')} onClick={() => selectDate('year')}>
//                 This Year
//               </a>
//             </div>
//             <RangePicker
//               value={rangePickerValue}
//               onChange={handleRangePickerChange}
//               style={{
//                 width: 256,
//               }}
//             />
//           </div>
//         }
//         size="large"
//         tabBarStyle={{
//           marginBottom: 24,
//         }}
//       >
//         <TabPane tab="To change to approrpiate" key="sales">
//           <Row>
//             <Col xl={16} lg={12} md={12} sm={24} xs={24}>
//               <div className={styles.salesBar}>
//                 <Column
//                   height={300}
//                   forceFit
//                   data={salesData}
//                   xField="x"
//                   yField="y"
//                   xAxis={{
//                     visible: true,
//                     title: {
//                       visible: false,
//                     },
//                   }}
//                   yAxis={{
//                     visible: true,
//                     title: {
//                       visible: false,
//                     },
//                   }}
//                   title={{
//                     visible: true,
//                     text: 'To change',
//                     style: {
//                       fontSize: 14,
//                     },
//                   }}
//                   meta={{
//                     y: {
//                       alias: 'Foot Traffic?',
//                     },
//                   }}
//                 />
//               </div>
//             </Col>
//             <Col xl={8} lg={12} md={12} sm={24} xs={24}>
//               <div className={styles.salesRank}>
//                 <h4 className={styles.rankingTitle}>Top Sales (stores)</h4>
//                 <ul className={styles.rankingList}>
//                   {rankingListData.map((item, i) => (
//                     <li key={item.title}>
//                       <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
//                         {i + 1}
//                       </span>
//                       <span className={styles.rankingItemTitle} title={item.title}>
//                         {item.title}
//                       </span>
//                       <span className={styles.rankingItemValue}>
//                         {numeral(item.total).format('0,0')}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tab="Foot Traffic?" key="views">
//           <Row>
//             <Col xl={16} lg={12} md={12} sm={24} xs={24}>
//               <div className={styles.salesBar}>
//                 <Column
//                   height={300}
//                   forceFit
//                   data={salesData}
//                   xField="x"
//                   yField="y"
//                   xAxis={{
//                     visible: true,
//                     title: {
//                       visible: false,
//                     },
//                   }}
//                   yAxis={{
//                     visible: true,
//                     title: {
//                       visible: false,
//                     },
//                   }}
//                   title={{
//                     visible: true,
//                     text: 'FootTraffic',
//                     style: {
//                       fontSize: 14,
//                     },
//                   }}
//                   meta={{
//                     y: {
//                       alias: "to change"
//                     },
//                   }}
//                 />
//               </div>
//             </Col>
//             <Col xl={8} lg={12} md={12} sm={24} xs={24}>
//               <div className={styles.salesRank}>
//                 <h4 className={styles.rankingTitle}>门店访问量排名</h4>
//                 <ul className={styles.rankingList}>
//                   {rankingListData.map((item, i) => (
//                     <li key={item.title}>
//                       <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
//                         {i + 1}
//                       </span>
//                       <span className={styles.rankingItemTitle} title={item.title}>
//                         {item.title}
//                       </span>
//                       <span>{numeral(item.total).format('0,0')}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Col>
//           </Row>
//         </TabPane>
//       </Tabs>
//     </div>
//   </Card>
// );

export default DemoColumn;
