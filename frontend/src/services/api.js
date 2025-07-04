import axios from 'axios';

const API = '/api';

export const fetchTransactions = (month, search = '', page = 1) =>
  axios.get(`${API}/transactions`, { params: { month, search, page } });

export const fetchStatistics = (month) =>
  axios.get(`${API}/statistics`, { params: { month } });

export const fetchBarChart = (month) =>
  axios.get(`${API}/bar-chart`, { params: { month } });

export const fetchPieChart = (month) =>
  axios.get(`${API}/pie-chart`, { params: { month } });
