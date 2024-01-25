const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const short = require("short-uuid");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");

const { User } = require("../../models");

const changeAPIKey = async (req, res) => {
  try {
    const userData = req.body;
    const apiKey = short.generate();

    const updatedUser = await User.findOneAndUpdate(
      { email: userData.email },
      { apiKey: apiKey },
      { new: true }
    );

    if (!updatedUser) {
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
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.API_KEY_NOT_GENERATED,
      statusCodeConstant.ERROR
    );
    logger(["changeapikey", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { changeAPIKey };
