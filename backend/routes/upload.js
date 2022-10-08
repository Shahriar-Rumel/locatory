const express = require('express');
const { uploadFile } = require('../controller/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/').post(protect, uploadFile);

module.exports = router;
