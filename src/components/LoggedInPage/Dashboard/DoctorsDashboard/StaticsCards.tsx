import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';

interface StatisticsCardsProps {
  total: number;
  pending: number;
  confirmed: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ total, pending, confirmed }) => {
  return (
    <Row gutter={16} style={{ marginBottom: '24px' }}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Appointments Today" value={total} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Pending Appointments" value={pending} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Confirmed Appointments" value={confirmed} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;
