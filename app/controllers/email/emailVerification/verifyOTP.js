const {
  statusCodeConstant,
  responseConstant,
} = require("../../../../constants");

const { logger } = require("../../../../utils");
const { responseBuilder } = require("../../../../utils/responseBuilder");

const {
  checkExistingOTP,
} = require("../../../../utils/checkExistingDataInDatabase");
const bcrypt = require("bcrypt");
const { Email } = require("../../../models");

const verifyOTP = async (req, res) => {
  try {
    logger(["Inside verify OTP"]);
    const userData = req.body;

    const existingData = await Email.findOneAndDelete({
      sender: userData.sender,
      receiver: userData.receiver,
      appName: userData.appName,
    });

    if (!existingData) {
      logger(["No existing OTP"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.VERIFICATION_CODE_INVALID,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const encryptedOTP = existingData.otp;

    const verificationResult = await bcrypt.compare(userData.otp, encryptedOTP);

    if (!verificationResult) {
      logger(["Invalid OTP"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.VERIFICATION_CODE_INVALID,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      {},
      responseConstant.VERIFICATION_CODE_VALID,
      statusCodeConstant.SUCCESS
    );
    logger(["OTP verified", generatedResponse]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.FAILED_TO_VALIDATE_CODE,
      statusCodeConstant.ERROR
    );
    logger(["Error in verify otp", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyOTP };
