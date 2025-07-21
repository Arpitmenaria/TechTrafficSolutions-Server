const express = require('express');
const router = express.Router();
const { submitInquiry } = require('../controllers/inquiryController');

router.post('/inquiry', submitInquiry); // ✅ Public for frontend

module.exports = router;
