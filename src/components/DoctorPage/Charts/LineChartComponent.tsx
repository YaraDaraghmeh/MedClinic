// components/Dashboard/Charts/LineChartComponent.tsx
import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartComponentProps {
  data: { month: string; patients: number }[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <Card title="Patient Growth Over Time">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="patients" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartComponent;