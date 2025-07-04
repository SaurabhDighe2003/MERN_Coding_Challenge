import React, { useEffect, useState } from 'react';
import {
  fetchTransactions,
  fetchStatistics,
  fetchBarChart,
  fetchPieChart
} from './services/api';
import TransactionTable from './components/TransactionTable';
import StatsCard from './components/StatsCard';
import BarChartComp from './components/BarChart';
import PieChartComp from './components/PieChart';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function App() {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllData();
  }, [month, search, page]);

  const fetchAllData = async () => {
    try {
      const tx = await fetchTransactions(month, search, page);
      setTransactions(tx.data.transactions);
      setTotalPages(tx.data.totalPages);

      const st = await fetchStatistics(month);
      setStats(st.data);

      const bc = await fetchBarChart(month);
      setBarChartData(bc.data);

      const pc = await fetchPieChart(month);
      setPieChartData(pc.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid="xl" className="mt-4 px-4 bg-light min-vh-100 py-4">

      <div className="d-flex justify-content-center align-items-center mb-5">
        <div
          className="rounded-circle bg-white shadow d-flex justify-content-center align-items-center border"
          style={{ width: '180px', height: '180px' }}
        >
          <h2 className="text-center text-dark fw-bold mb-0">
            Transaction<br />Dashboard
          </h2>
        </div>
      </div>

      <Card className="p-4 mb-4 shadow-sm border-0">
        <Row className="g-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="🔍 Search transactions..."
              value={search}
              className="shadow-sm"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="shadow-sm"
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card>

      <Card className="p-3 mb-4 shadow-sm border-0">
        <TransactionTable
          transactions={transactions}
          page={page}
          totalPages={totalPages}
          onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
        />
      </Card>

      <Row className="gy-4">
        <Col md={12}>
          <Card className="p-3 shadow-sm border-0">
            <StatsCard stats={stats} month={month} />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm border-0">
            <BarChartComp data={barChartData} month={month} />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm border-0">
            <PieChartComp data={pieChartData} month={month} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
