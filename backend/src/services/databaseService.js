const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Find submission by email
const findSubmissionByEmail = async (email) => {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('client_email', email)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error finding submission:', error);
    return null;
  }
  
  return data || null;
};

// Create client reply
const createClientReply = async (data) => {
  const { submission_id, email, subject, message, timestamp } = data;
  
  const { data: reply, error } = await supabase
    .from('client_replies')
    .insert({
      submission_id,
      email,
      subject,
      message,
      timestamp: timestamp || new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating client reply:', error);
    throw error;
  }
  
  return reply;
};

// Create provider reply
const createProviderReply = async (data) => {
  const { submission_id, client_email, message, timestamp } = data;
  
  const { data: reply, error } = await supabase
    .from('provider_replies')
    .insert({
      submission_id,
      client_email,
      message,
      timestamp: timestamp || new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating provider reply:', error);
    throw error;
  }
  
  return reply;
};

// Update submission
const updateSubmission = async (id, updates) => {
  const { data, error } = await supabase
    .from('submissions')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
  
  return data;
};

// Get all replies with submissions
const getAllReplies = async (filters = {}) => {
  let query = supabase
    .from('submissions')
    .select(`
      *,
      client_replies (
        id,
        message,
        timestamp
      ),
      provider_replies (
        id,
        message,
        timestamp
      )
    `)
    .order('timestamp', { ascending: false })
    .limit(filters.limit || 100);
  
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters.email) {
    query = query.eq('client_email', filters.email);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error getting replies:', error);
    throw error;
  }
  
  return data || [];
};

// Get conversation by submission ID
const getConversation = async (submissionId) => {
  // Get submission
  const { data: submission, error: submissionError } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', submissionId)
    .single();
  
  if (submissionError || !submission) {
    return null;
  }
  
  // Get client replies
  const { data: clientReplies, error: clientError } = await supabase
    .from('client_replies')
    .select('*')
    .eq('submission_id', submissionId)
    .order('timestamp', { ascending: true });
  
  if (clientError) {
    console.error('Error getting client replies:', clientError);
  }
  
  // Get provider replies
  const { data: providerReplies, error: providerError } = await supabase
    .from('provider_replies')
    .select('*')
    .eq('submission_id', submissionId)
    .order('timestamp', { ascending: true });
  
  if (providerError) {
    console.error('Error getting provider replies:', providerError);
  }
  
  return {
    submission,
    client_replies: clientReplies || [],
    provider_replies: providerReplies || []
  };
};

module.exports = {
  supabase,
  findSubmissionByEmail,
  createClientReply,
  createProviderReply,
  updateSubmission,
  getAllReplies,
  getConversation
};

