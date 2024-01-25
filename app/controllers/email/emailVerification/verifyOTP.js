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
    const userData = req.body;
    const existingData = await checkExistingOTP(
      userData.sender,
      userData.receiver,
      userData.appName
    );

    if (!existingData) {
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
      const generatedResponse = responseBuilder(
        {},
        responseConstant.VERIFICATION_CODE_INVALID,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    await Email.deleteMany({
      sender: userData.sender,
      receiver: userData.receiver,
      appName: userData.appName,
    });

    const generatedResponse = responseBuilder(
      {},
      responseConstant.VERIFICATION_CODE_VALID,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.FAILED_TO_VALIDATE_CODE,
      statusCodeConstant.ERROR
    );
    logger(["verifyotp", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyOTP };
