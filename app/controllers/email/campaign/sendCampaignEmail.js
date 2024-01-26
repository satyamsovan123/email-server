const { logger, campaignEmailGenerator } = require("../../../../utils");
const { responseBuilder } = require("../../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
} = require("../../../../constants");
const { emailSender } = require("../utils/emailSender");

const sendCampaignEmail = async (req, res) => {
  try {
    logger(["Inside send campaign email"]);
    const userData = req.body;

    const mailOptions = campaignEmailGenerator(
      userData.sender,
      userData.receiver,
      userData.emailBody,
      userData.appName
    );

    logger(["Mail option", mailOptions]);

    const mail = await emailSender(mailOptions);

    if (!mail) {
      logger(["Campaign email not sent"]);
      const generatedResponse = responseBuilder(
        {},
        responseConstant.EMAIL_NOT_SENT,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      {},
      responseConstant.EMAIL_SENT,
      statusCodeConstant.SUCCESS
    );
    logger(["Campaign email sent", generatedResponse]);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.EMAIL_NOT_SENT,
      statusCodeConstant.ERROR
    );
    logger(["Error in send campaign email", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { sendCampaignEmail };
