// components/Dashboard/StatisticsCards.tsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';

const StatisticsCards: React.FC = () => {
  return (
    <Row gutter={16} style={{ marginBottom: '24px' }}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Appointments Today" value={25} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Pending Appointments" value={5} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Confirmed Appointments" value={20} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;