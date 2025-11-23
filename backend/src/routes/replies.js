const express = require('express');
const router = express.Router();
const db = require('../services/databaseService');

// Get all replies
router.get('/', async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      email: req.query.email,
      limit: parseInt(req.query.limit) || 100
    };
    
    const replies = await db.getAllReplies(filters);
    res.json({ success: true, data: replies });
  } catch (error) {
    console.error('Get replies error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get conversation by submission ID
router.get('/conversation/:id', async (req, res) => {
  try {
    const conversation = await db.getConversation(req.params.id);
    
    if (!conversation) {
      return res.status(404).json({ 
        success: false, 
        error: 'Conversation not found' 
      });
    }
    
    res.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get replies by email
router.get('/client/:email', async (req, res) => {
  try {
    const filters = { email: req.params.email };
    const replies = await db.getAllReplies(filters);
    res.json({ success: true, data: replies });
  } catch (error) {
    console.error('Get replies by email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

