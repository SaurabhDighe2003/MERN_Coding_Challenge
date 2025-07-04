const express = require('express');
const router = express.Router();

const {
  seedTransactions,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData
} = require('../controllers/transactionController');



router.get('/init', seedTransactions);
router.get('/transactions', getTransactions); 
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData); 
router.get('/pie-chart', getPieChartData);



module.exports = router;
