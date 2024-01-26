const { appConfig } = require("../../../../configs/appConfig");
const { logger } = require("../../../../utils");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: appConfig.emailProvider,
  auth: {
    user: appConfig.emailUsername,
    pass: appConfig.emailPassword,
  },
});

const emailSender = async (mailOptions) => {
  try {
    logger(["Inside email sender"]);
    const result = await transporter.sendMail(mailOptions);
    if (!result) {
      logger(["Email not sent"]);
      return false;
    }
    return true;
  } catch (error) {
    logger(["Error in email sender", error]);
    return false;
  }
};

module.exports = {
  emailSender,
};
