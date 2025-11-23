const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

module.exports = (io) => {
  // Client reply webhook
  router.post('/client-reply', async (req, res) => {
    try {
      const result = await webhookController.handleClientReply(req.body, io);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Client reply webhook error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  // Provider reply webhook
  router.post('/provider-reply', async (req, res) => {
    try {
      const result = await webhookController.handleProviderReply(req.body, io);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Provider reply webhook error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  return router;
};

