const { logger } = require("./logger");
const { overengineedBoxifier } = require("./overengineedBoxifier");
const { generateJWT, generateAPIKey } = require("./authenticationHelper");
const {
  checkExistingData,
  checkExistingUser,
  checkExistingAPIKey,
} = require("./checkExistingDataInDatabase");

const {
  OTPEmailGenerator,
  campaignEmailGenerator,
} = require("../utils/emailGenerator");

const {
  compareEncryptedText,
  excryptPlainText,
} = require("./encryptionDecryption");

const { checkExistingOTP } = require("./checkExistingDataInDatabase");

module.exports = {
  logger,
  overengineedBoxifier,
  compareEncryptedText,
  excryptPlainText,
  generateJWT,
  checkExistingData,
  checkExistingUser,
  generateAPIKey,
  checkExistingAPIKey,
  OTPEmailGenerator,
  campaignEmailGenerator,
  checkExistingOTP,
};
