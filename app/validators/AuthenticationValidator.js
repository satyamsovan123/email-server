const Joi = require("joi");
const { appConstant, responseConstant } = require("../../constants");
const { logger } = require("../../utils");

class AuthenticationValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .email()
        .min(1)
        .required()
        .messages({
          "string.email": `${appConstant.EMAIL} ${responseConstant.IS_INVALID} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${appConstant.EMAIL} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.EMAIL} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
        }),

      password: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.empty": `${appConstant.PASSWORD} ${responseConstant.IS_EMPTY} ${responseConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${appConstant.PASSWORD} ${responseConstant.SHOULD_HAVE} at least {#limit} characters. ${responseConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${appConstant.PASSWORD} ${responseConstant.IS_REQUIRED} ${responseConstant.PROVIDE_VALID_DATA}`,
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
      logger(["Error in authentication validator", error]);
      return error?.message ?? responseConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { AuthenticationValidator };
