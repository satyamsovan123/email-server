const Joi = require("joi");
const { appConstant, responseConstant } = require("../../constants");
const { logger } = require("../../utils");

class CampaignEmailValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      sender: Joi.string()
        .email()
        .min(1)
        .required()
        .messages({
          "string.email": `${
            appConstant.SENDER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_INVALID
          } ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${
            appConstant.SENDER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_EMPTY
          } ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${
            appConstant.SENDER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_REQUIRED
          } ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      receiver: Joi.string()
        .not(Joi.ref("sender"))
        .email()
        .min(1)
        .required()
        .messages({
          "any.invalid": `${
            appConstant.SENDER
          } ${appConstant.EMAIL.toLocaleLowerCase()} and ${appConstant.RECEIVER.toLocaleLowerCase()} ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.CANNOT_BE_SAME
          } ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.email": `${
            appConstant.RECEIVER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_INVALID
          } ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${
            appConstant.RECEIVER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_EMPTY
          } ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${
            appConstant.RECEIVER
          } ${appConstant.EMAIL.toLocaleLowerCase()} ${
            responseConstant.IS_REQUIRED
          } ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      appName: Joi.string()
        .min(1)
        .required()
        .messages({
          "string.empty": `${appConstant.APP_NAME} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.APP_NAME} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
      emailBody: Joi.string()
        .min(1)
        .required()
        .messages({
          "string.empty": `${appConstant.EMAIL_BODY} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.EMAIL_BODY} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),
    }).messages({
      "object.unknown": `${responseConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    try {
      await this.validationResult;
    } catch (error) {
      logger(["Error in campaign email validator", error]);
      return error?.message ?? responseConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { CampaignEmailValidator };
