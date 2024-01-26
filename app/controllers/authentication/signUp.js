const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");
const { User } = require("../../models");
const {
  excryptPlainText,
  generateJWT,
  generateAPIKey,
} = require("../../../utils");

const signUp = async (req, res) => {
  try {
    logger(["Inside sign up"]);
    const userData = req.body;

    const apiKey = generateAPIKey();
    const encryptedPassword = await excryptPlainText(userData.password);
    const newUser = new User({
      email: userData.email,
      password: encryptedPassword,
      apiKey: apiKey,
    });
    await User.create(newUser);

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      { apiKey: apiKey },
      responseConstant.SIGN_UP_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(["Token generated - ", token, "API key - ", apiKey]);
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_UP_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["Error in sign up", generatedResponse, error]);

    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
