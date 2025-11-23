const express = require('express');
const router = express.Router();
const db = require('../services/databaseService');

// Get analytics
router.get('/', async (req, res) => {
  try {
    const { supabase } = db;
    
    // Total submissions
    const { count: totalSubmissions } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true });
    
    // Client replies count
    const { count: clientReplies } = await supabase
      .from('client_replies')
      .select('*', { count: 'exact', head: true });
    
    // Provider replies count
    const { count: providerReplies } = await supabase
      .from('provider_replies')
      .select('*', { count: 'exact', head: true });
    
    // Get submissions with client_replied status
    const { data: repliedSubmissions } = await supabase
      .from('submissions')
      .select('client_replied, client_replied_at, timestamp')
      .eq('client_replied', true);
    
    // Calculate response rate
    const responseRate = totalSubmissions > 0 
      ? ((repliedSubmissions?.length || 0) / totalSubmissions * 100).toFixed(2)
      : '0.00';
    
    // Calculate average response time
    let avgResponseTime = 0;
    if (repliedSubmissions && repliedSubmissions.length > 0) {
      const responseTimes = repliedSubmissions
        .filter(s => s.client_replied_at && s.timestamp)
        .map(s => {
          const diff = new Date(s.client_replied_at) - new Date(s.timestamp);
          return diff / (1000 * 60 * 60); // Convert to hours
        });
      
      if (responseTimes.length > 0) {
        avgResponseTime = (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2);
      }
    }
    
    res.json({
      success: true,
      data: {
        total_submissions: totalSubmissions || 0,
        total_client_replies: clientReplies || 0,
        total_provider_replies: providerReplies || 0,
        response_rate: responseRate,
        avg_response_time_hours: avgResponseTime
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

