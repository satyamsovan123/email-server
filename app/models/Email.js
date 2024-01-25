const mongoose = require("mongoose");
const { appConfig } = require("../../configs/appConfig");

const emailSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    otp: { type: String, required: true },
    appName: { type: String, required: true },
    expireAt: {
      required: false,
      type: Date,
      default: Date.now() + appConfig.expiresAfterMinutes * 60 * 1000,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);
emailSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("Email", emailSchema);
