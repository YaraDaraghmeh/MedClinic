import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartComponentProps {
  data: { day: string; appointments: number }[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <Card title="Appointments Per Day" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#666' }} 
            axisLine={{ stroke: '#ccc' }} 
          />
          <YAxis 
            tick={{ fill: '#666' }} 
            axisLine={{ stroke: '#ccc' }} 
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }} 
          />
          <Line 
            type="monotone" 
            dataKey="appointments" 
            stroke="#1890ff" 
            strokeWidth={2} 
            dot={{ fill: '#1890ff', r: 4 }} 
            activeDot={{ r: 6 }} 
            animationDuration={500} 
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartComponent;