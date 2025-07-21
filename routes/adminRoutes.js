const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');
const { getAllInquiries } = require('../controllers/inquiryController');
const protect = require('../middleware/authMiddleware');

router.post('/admin/login', loginAdmin);
router.get('/admin/inquiries', protect, getAllInquiries);

module.exports = router;
