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
    const result = await transporter.sendMail(mailOptions);
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    logger(["emailSender", error]);
    return false;
  }
};

module.exports = {
  emailSender,
};
