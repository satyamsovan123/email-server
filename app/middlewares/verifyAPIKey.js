const {
  responseConstant,
  statusCodeConstant,
  serverConstant,
} = require("../../constants");
const { logger, checkExistingAPIKey } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const jwt = require("jsonwebtoken");

const verifyAPIKey = async (req, res, next) => {
  try {
    logger("Inside API key verification");
    const apiKey = req.headers?.[serverConstant.EMAIL_SERVER_API_KEY] ?? "";
    const email = req.body.sender ?? "";
    // const apiKey = req.query.apiKey;

    const existingKey = await checkExistingAPIKey(email, apiKey);

    if (!existingKey) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.API_KEY_INVALID,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.API_KEY_INVALID,
      statusCodeConstant.UNAUTHORIZED
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyAPIKey };
