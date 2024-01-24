const { responseConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const jwt = require("jsonwebtoken");
const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");

const verifyJWT = async (req, res, next) => {
  try {
    logger("Inside JWT");
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    const existingUser = await checkExistingUser(decodedData?.email);
    // existingUser.email = "testuser@email.com";
    if (decodedData?.email !== existingUser?.email) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.PLEASE_SIGN_IN,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    req.body["email"] = decodedData?.email;
    // req.body["email"] = "testuser@email.com";

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.TOKEN_INVALID,
      statusCodeConstant.UNAUTHORIZED
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
