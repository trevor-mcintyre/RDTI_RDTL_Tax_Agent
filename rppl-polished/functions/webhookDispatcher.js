
// functions/webhookDispatcher.js
exports.sendWebhookEvent = async (eventType, payload) => {
  console.log(`[WEBHOOK] ${eventType}`, payload);
  // Extend to support outbound webhook delivery here
};
