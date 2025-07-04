import React from 'react';
import { Card, Container } from 'react-bootstrap';

export default function StatsCard({ stats, month }) {
  const { totalSaleAmount = 0, totalSoldItems = 0, totalNotSoldItems = 0 } = stats;

  return (
    <Container fluid className="p-4 mb-4" style={{ backgroundColor: '#eef7f8', borderRadius: '8px' }}>
      <h5 className="text-center mb-3">
        <strong>Statistics - {month}</strong>{' '}
        <span style={{ fontSize: '12px', color: '#555' }}>(Selected month name from dropdown)</span>
      </h5>

      <div className="d-flex justify-content-center">
        <div style={{
          backgroundColor: '#fbe18c',
          padding: '20px 30px',
          borderRadius: '16px',
          minWidth: '300px',
          fontSize: '16px'
        }}>
          <div className="d-flex justify-content-between mb-2">
            <span><strong>Total sale</strong></span>
            <span>₹ {totalSaleAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span><strong>Total sold item</strong></span>
            <span>{totalSoldItems}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span><strong>Total not sold item</strong></span>
            <span>{totalNotSoldItems}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
