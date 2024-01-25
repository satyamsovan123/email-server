const { AuthenticationValidator } = require("./AuthenticationValidator");

const { OTPValidator } = require("./OTPValidator");
const { CampaignEmailValidator } = require("./CampaignEmailValidator");

module.exports = {
  AuthenticationValidator,
  OTPValidator,
  CampaignEmailValidator,
};
