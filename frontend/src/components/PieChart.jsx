import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card } from 'react-bootstrap';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

export default function PieChartComp({ data, month }) {
  return (
    <Card className="p-4 mb-4" style={{ backgroundColor: '#fef9ec', border: 'none' }}>
      <h5 className="mb-3 text-center">
        Pie Chart - {month}{' '}
        <span style={{ fontSize: '13px', color: 'gray' }}>(Selected month name from dropdown)</span>
      </h5>

      {data.length === 0 ? (
        <div className="text-center">No data for selected month</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
