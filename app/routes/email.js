const express = require("express");
const router = express.Router();

const {
  sendCampaignEmail,
} = require("../controllers/email/campaign/sendCampaignEmail");
const { sendOTP } = require("../controllers/email/emailVerification/sendOTP");
const {
  verifyOTP,
} = require("../controllers/email/emailVerification/verifyOTP");
const { verifyAPIKey } = require("../middlewares/verifyAPIKey");
const { verifyOTPRequest } = require("../middlewares/verifyOTPRequest");
const { verifyCampaignEmail } = require("../middlewares");

router.post(
  "/sendcampaignemail",
  verifyCampaignEmail,
  verifyAPIKey,
  sendCampaignEmail
);
router.post("/sendotp", verifyOTPRequest, verifyAPIKey, sendOTP);
router.post("/verifyotp", verifyOTPRequest, verifyAPIKey, verifyOTP);

module.exports = router;
