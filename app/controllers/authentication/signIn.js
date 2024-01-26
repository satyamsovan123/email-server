const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
  serverConstant,
} = require("../../../constants");

const { compareEncryptedText, generateJWT } = require("../../../utils");

const signIn = async (req, res) => {
  try {
    logger(["Inside sign in"]);
    const userData = req.body;
    const isPasswordValid = await compareEncryptedText(
      userData.password,
      userData.hashedPassword
    );
    if (!isPasswordValid) {
      logger(["Invalid password"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.PROVIDE_VALID_CREDENTIALS,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      { apiKey: userData.apiKey },
      responseConstant.SIGN_IN_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    logger(["Token generated - ", token, "API key - ", userData.apiKey]);
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.SIGN_IN_ERROR,
      statusCodeConstant.ERROR
    );
    logger(["Error in signin", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signIn };
