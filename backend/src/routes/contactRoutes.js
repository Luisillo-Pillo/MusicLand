const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { sendContactMessage, getContactMessages } = require('../controllers/contactController');

const router = express.Router();

router.post('/', sendContactMessage);
router.get('/', protect, adminOnly, getContactMessages);

module.exports = router;
