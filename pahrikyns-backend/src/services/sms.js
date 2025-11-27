// Using any provider (Twilio, MSG91, etc). Implement provider SDK here.
async function sendSMS(to, message) {
// integrate provider, return result
console.log('SMS to', to, message);
return { ok: true };
}
module.exports = { sendSMS };