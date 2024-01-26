const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { statusCodeConstant, responseConstant } = require("../../../constants");

const { User } = require("../../models");
const { generateAPIKey } = require("../../../utils");

const changeAPIKey = async (req, res) => {
  try {
    logger(["Inside change API key"]);
    const userData = req.body;
    const apiKey = generateAPIKey();

    const updatedUser = await User.findOneAndUpdate(
      { email: userData.email },
      { apiKey: apiKey },
      { new: true }
    );

    if (!updatedUser) {
      logger(["No user found"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.API_KEY_NOT_GENERATED,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      { apiKey: apiKey },
      responseConstant.API_KEY_GENERATED,
      statusCodeConstant.SUCCESS
    );
    logger(["API key changed", generatedResponse]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.API_KEY_NOT_GENERATED,
      statusCodeConstant.ERROR
    );
    logger(["Error in change API key", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { changeAPIKey };
