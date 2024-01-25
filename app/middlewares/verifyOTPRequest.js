const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { OTPValidator } = require("../validators");

const verifyOTPRequest = async (req, res, next) => {
  try {
    const userData = req.body;
    const dataValidationResult = await new OTPValidator(
      userData
    ).getValidationResult();
    if (dataValidationResult) {
      logger(dataValidationResult);
      const generatedResponse = responseBuilder(
        {},
        dataValidationResult,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.ERROR_OCCURRED_WHILE_VERIFYING,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyOTPRequest };
