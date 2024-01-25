const { Data, Email } = require("../app/models");
const { User } = require("../app/models");
const { logger } = require("./logger");

const checkExistingData = async (title, email) => {
  let cursorData = null;
  if (!email || !title) {
    return cursorData;
  }
  await Data.findOne({ email: email, title: title })
    .select("title article _id")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

const checkExistingAPIKey = async (email, apiKey) => {
  let cursorData = null;
  if (!apiKey) {
    return cursorData;
  }
  await User.findOne({ apiKey: apiKey, email: email })
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

const checkExistingUser = async (email) => {
  let cursorData = null;
  if (!email) {
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password apiKey")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

const checkExistingOTP = async (sender, receiver, appName) => {
  let cursorData = null;
  if (!sender || !receiver) {
    return cursorData;
  }
  await Email.findOne({
    sender: sender,
    receiver: receiver,
    appName: appName,
  })
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = {
  checkExistingData,
  checkExistingAPIKey,
  checkExistingUser,
  checkExistingOTP,
};
