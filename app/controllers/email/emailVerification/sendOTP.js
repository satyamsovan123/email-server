const {
  statusCodeConstant,
  responseConstant,
} = require("../../../../constants");

const {
  logger,
  OTPEmailGenerator,
  excryptPlainText,
  checkExistingOTP,
} = require("../../../../utils");
const { responseBuilder } = require("../../../../utils/responseBuilder");
const { Email } = require("../../../models");
const { emailSender } = require("../utils/emailSender");
const sendOTP = async (req, res) => {
  try {
    logger(["Inside send OTP"]);

    const userData = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const encryptedOTP = await excryptPlainText(otp.toString());

    const mailOptions = OTPEmailGenerator(
      userData.sender,
      userData.receiver,
      otp,
      userData.appName
    );

    logger(["Mail option", mailOptions]);

    const deletedData = await Email.deleteMany({
      sender: userData.sender,
      receiver: userData.receiver,
      appName: userData.appName,
    });

    if (deletedData) {
      logger(["Existing OTP deleted"]);
    }

    const newEmail = await Email.create(
      new Email({
        sender: userData.sender,
        receiver: userData.receiver,
        otp: encryptedOTP,
        appName: userData.appName,
      })
    );

    if (!newEmail) {
      logger(["Error in creating new OTP"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.VERIFICATION_CODE_NOT_SENT,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const mail = await emailSender(mailOptions);

    if (!mail) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.VERIFICATION_CODE_NOT_SENT,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      {},
      responseConstant.VERIFICATION_CODE_SENT,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.VERIFICATION_CODE_NOT_SENT,
      statusCodeConstant.ERROR
    );
    logger(["Error in send OTP", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { sendOTP };
