const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/user', authRoutes);

module.exports = router;
