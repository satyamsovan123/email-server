const { appConfig } = require("../configs/appConfig");

function OTPEmailGenerator(sender, receiver, otp, appName) {
  const mailOptions = {
    from: sender,
    to: receiver,
    subject: `OTP (One Time Password) for ${appName}`,
    html: `
    <p>Greetings!</p>
    <br>
    <p>Hope you are doing well. Thanks for using ${appName}.</p>
    <p>Your OTP (One Time Password) is - <b>${otp}</b>. This OTP (One Time Password) will expire after ${appConfig.expiresAfterMinutes} minutes. Please use it promptly.</p>
    <br>
    <p>Thanks and regards,
    <br>${appName} admin</p>
    `,
  };
  return mailOptions;
}

function campaignEmailGenerator(sender, receiver, emailBody, appName) {
  const mailOptions = {
    from: sender,
    to: receiver,
    subject: `${appName}`,
    html: `
    <p>Greetings!</p>
    <br>
    <p>Hope you are doing well. Thanks for using ${appName}.</p>
    <p>${emailBody}</p>
    <br>
    <p>Thanks and regards,
    <br>${appName} admin</p>
    `,
  };
  return mailOptions;
}

module.exports = { OTPEmailGenerator, campaignEmailGenerator };
