const express = require('express');
const authRoutes = require('./auth');
const boardsRoutes = require('./boards');

const router = express.Router();

router.use('/user', authRoutes);
router.use('/boards', boardsRoutes);

module.exports = router;
