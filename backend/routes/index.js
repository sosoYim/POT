const express = require('express');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/user', authRoutes);

module.exports = router;
