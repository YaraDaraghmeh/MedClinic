import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, colors }) => {
  return (
    <Card title="Appointment Status">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComponent;