import { Suspense, useEffect} from 'react';
import { Col, Dropdown, Menu, Row,Card } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';

import OfflineData from './components/OfflineData';
import BarChartDemo from './components/Seasonal/index'

import PageLoading from './components/PageLoading';
import heatmap from "../../../../public/heatmap.png"
import ProCard from '@ant-design/pro-card';

import {getHeatMap} from './service'

import { useModel } from 'umi';

const Analysis = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(initialState?.currentUser[0])

  useEffect(() => {
    getHeatMap()
  }, [])

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow />
        </Suspense>

        <Suspense fallback={null}>
          <OfflineData/>
        </Suspense>

        <BarChartDemo />
        
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col>
              <ProCard
              layout="center" bordered
              title="HeatMap of VivoCity"
              >
                <img src={heatmap}/>
              </ProCard>
          </Col>
          
        </Row>
      </>
    </GridContent>
  );
};

export default Analysis;
