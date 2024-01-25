const { logger, campaignEmailGenerator } = require("../../../../utils");
const { responseBuilder } = require("../../../../utils/responseBuilder");
const {
  statusCodeConstant,
  responseConstant,
} = require("../../../../constants");
const { emailSender } = require("../utils/emailSender");

const sendCampaignEmail = async (req, res) => {
  try {
    const userData = req.body;

    const mailOptions = campaignEmailGenerator(
      userData.sender,
      userData.receiver,
      userData.emailBody,
      userData.appName
    );

    const mail = await emailSender(mailOptions);

    if (!mail) {
      const generatedResponse = responseBuilder(
        {},
        responseConstant.EMAIL_NOT_SENT,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    logger(["mailOptions", mailOptions]);

    const generatedResponse = responseBuilder(
      {},
      responseConstant.EMAIL_SENT,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      responseConstant.EMAIL_NOT_SENT,
      statusCodeConstant.ERROR
    );
    logger(["sendcampaignemail", generatedResponse, error]);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { sendCampaignEmail };
