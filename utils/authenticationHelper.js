const { logger } = require("./logger");
const jwt = require("jsonwebtoken");
const short = require("short-uuid");

const generateJWT = async (data) => {
  if (!data) {
    return "";
  }
  try {
    const token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    });
    return token;
  } catch (error) {
    logger(error);
    return "";
  }
};

const generateAPIKey = () => {
  try {
    const apiKey = short.generate();
    return apiKey;
  } catch (error) {
    logger(error);
    return "";
  }
};

module.exports = {
  generateJWT,
  generateAPIKey,
};
