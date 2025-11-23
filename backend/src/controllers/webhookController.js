const db = require('../services/databaseService');

const handleClientReply = async (data, io) => {
  const { email, from, message, subject, timestamp, body } = data;
  
  // Find submission by email
  const submission = await db.findSubmissionByEmail(email);
  
  if (!submission) {
    throw new Error(`Submission not found for email: ${email}`);
  }
  
  // Create client reply
  const reply = await db.createClientReply({
    submission_id: submission.id,
    email: from || email,
    subject: subject || 'Re: Consultation Request',
    message: message || body || '',
    timestamp: timestamp ? new Date(timestamp) : new Date()
  });
  
  // Update submission
  await db.updateSubmission(submission.id, {
    client_replied: true,
    client_replied_at: reply.timestamp,
    status: 'client_replied'
  });
  
  // Emit real-time update
  if (io) {
    io.to('replies-room').emit('new-client-reply', {
      submission_id: submission.id,
      reply: reply
    });
  }
  
  console.log(`✅ Client reply processed: ${email}`);
  
  return {
    submission_id: submission.id,
    reply_id: reply.id,
    message: 'Client reply processed successfully'
  };
};

const handleProviderReply = async (data, io) => {
  const { email, from, message, timestamp } = data;
  
  // Find submission by email
  const submission = await db.findSubmissionByEmail(email);
  
  if (!submission) {
    throw new Error(`Submission not found for email: ${email}`);
  }
  
  // Create provider reply
  const reply = await db.createProviderReply({
    submission_id: submission.id,
    client_email: email,
    message: message || '',
    timestamp: timestamp ? new Date(timestamp) : new Date()
  });
  
  // Update submission
  await db.updateSubmission(submission.id, {
    provider_replied: true,
    provider_replied_at: reply.timestamp,
    status: 'provider_replied'
  });
  
  // Emit real-time update
  if (io) {
    io.to('replies-room').emit('new-provider-reply', {
      submission_id: submission.id,
      reply: reply
    });
  }
  
  console.log(`✅ Provider reply processed: ${email}`);
  
  return {
    submission_id: submission.id,
    reply_id: reply.id,
    message: 'Provider reply processed successfully'
  };
};

module.exports = {
  handleClientReply,
  handleProviderReply
};

