import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function TransactionTable({ transactions, page, totalPages, onNext, onPrev }) {
  return (
    <div>
      <h5 className="mb-3">Transactions List</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx, idx) => (
              <tr key={tx._id}>
                <td>{(page - 1) * 10 + idx + 1}</td>
                <td>{tx.title}</td>
                <td>{tx.price.toFixed(2)}</td>
                <td>{tx.category}</td>
                <td>{tx.sold ? '✅' : '❌'}</td>
                <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <Button onClick={onPrev} disabled={page <= 1}>
          ⬅ Previous
        </Button>
        <div>Page {page} of {totalPages}</div>
        <Button onClick={onNext} disabled={page >= totalPages}>
          Next ➡
        </Button>
      </div>
    </div>
  );
}
