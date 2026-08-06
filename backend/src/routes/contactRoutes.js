const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');
const {
  sendContactMessage,
  getContactMessages,
  deleteContactMessage,
  replyContactMessage
} = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactLimiter, sendContactMessage);
router.get('/', protect, adminOnly, getContactMessages);
router.post('/:id/reply', protect, adminOnly, replyContactMessage);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

module.exports = router;
