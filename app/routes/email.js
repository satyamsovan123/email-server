const express = require("express");
const router = express.Router();

const {
  sendCampaignEmail,
} = require("../controllers/email/campaign/sendCampaignEmail");
const { sendOTP } = require("../controllers/email/emailVerification/sendOTP");
const {
  verifyOTP,
} = require("../controllers/email/emailVerification/verifyOTP");
const { verifyAPIKeyRequest } = require("../middlewares/verifyAPIKeyRequest");
const { verifyOTPRequest } = require("../middlewares/verifyOTPRequest");
const { verifyCampaignEmailRequest } = require("../middlewares");

router.post(
  "/sendcampaignemail",
  verifyCampaignEmailRequest,
  verifyAPIKeyRequest,
  sendCampaignEmail
);
router.post("/sendotp", verifyOTPRequest, verifyAPIKeyRequest, sendOTP);
router.post("/verifyotp", verifyOTPRequest, verifyAPIKeyRequest, verifyOTP);

module.exports = router;
