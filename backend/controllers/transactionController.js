const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedTransactions = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

  
    await Transaction.deleteMany();

    await Transaction.insertMany(data);

    res.status(200).json({ message: 'Database initialized with seed data.' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: ' Failed to seed transactions' });
  }
};


const getTransactions = async (req, res) => {
  try {
    const { month = 'March', search = '', page = 1, perPage = 10 } = req.query;

    const monthNumber = new Date(`${month} 1, 2000`).getMonth(); // 0-based

    const regex = new RegExp(search, 'i');

    const filter = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber + 1] },
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        
      ]
    };

    const skip = (parseInt(page) - 1) * parseInt(perPage);

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(parseInt(perPage));

    const totalCount = await Transaction.countDocuments(filter);

    res.json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages: Math.ceil(totalCount / perPage),
      totalCount,
      transactions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching transactions.' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month = 'March' } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const filter = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
    };

    const allTransactions = await Transaction.find(filter);

    const totalSoldItems = allTransactions.filter(t => t.sold).length;
    const totalNotSoldItems = allTransactions.filter(t => !t.sold).length;
    const totalSaleAmount = allTransactions
      .filter(t => t.sold)
      .reduce((acc, curr) => acc + curr.price, 0);

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

const getBarChartData = async (req, res) => {
  try {
    const { month = 'March' } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
    });

    const ranges = [
      { range: '0 - 100', min: 0, max: 100 },
      { range: '101 - 200', min: 101, max: 200 },
      { range: '201 - 300', min: 201, max: 300 },
      { range: '301 - 400', min: 301, max: 400 },
      { range: '401 - 500', min: 401, max: 500 },
      { range: '501 - 600', min: 501, max: 600 },
      { range: '601 - 700', min: 601, max: 700 },
      { range: '701 - 800', min: 701, max: 800 },
      { range: '801 - 900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity }
    ];

    const result = ranges.map(r => ({
      range: r.range,
      count: transactions.filter(t => t.price >= r.min && t.price <= r.max).length
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  }
};
const getPieChartData = async (req, res) => {
  try {
    const { month = 'March' } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
    });

    const categoryCount = {};

    transactions.forEach(tx => {
      categoryCount[tx.category] = (categoryCount[tx.category] || 0) + 1;
    });

    const result = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};


module.exports = {
  seedTransactions,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData
};

