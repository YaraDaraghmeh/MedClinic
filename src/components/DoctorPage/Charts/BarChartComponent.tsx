import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartComponentProps {
  data: { day: string; appointments: number }[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <Card title="Appointments Per Day">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="appointments" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarChartComponent;