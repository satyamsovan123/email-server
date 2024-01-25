const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");

const { sendOTP } = require("./email/emailVerification/sendOTP");
const { verifyOTP } = require("./email/emailVerification/verifyOTP");
const { sendCampaignEmail } = require("./email/campaign/sendCampaignEmail");

module.exports = {
  signUp,
  signIn,
  sendOTP,
  verifyOTP,
  sendCampaignEmail,
};
