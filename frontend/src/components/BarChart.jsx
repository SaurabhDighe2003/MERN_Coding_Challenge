import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Card } from 'react-bootstrap';

export default function BarChartComp({ data, month = 'March' }) {
  return (
    <Card style={{ backgroundColor: '#eaf6fb', border: 'none' }} className="p-4 mb-4">
      <h5 className="mb-4 text-center">Bar Chart Stats - {month} <span style={{ fontSize: '13px', color: 'gray' }}>(Selected month name from dropdown)</span></h5>
      {data.length === 0 ? (
        <div className="text-center">No data available for selected month</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6dd5ed" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
