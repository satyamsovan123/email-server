const dotenv = require("dotenv");
require("dotenv").config();
const fs = require("fs");
const filePath = "VERSION";

function getApplicationVersion() {
  let versionString = "Version 0.0";
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const majorVersion = data.split("\n")[0].split("=")[1];
    const minorVersion = data.split("\n")[1].split("=")[1];
    versionString = `Version ${majorVersion}.${minorVersion}`;
  } catch (error) {
    console.error("Error reading file -", error);
  }
  return versionString;
}

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const appConfig = {
  appName: process.env.APP_NAME,
  frontendURL: process.env.FRONTEND_URL,
  backendURL: process.env.BACKEND_URL,
  environment: process.env.NODE_ENV,
  port: JSON.parse(process.env.PORT),
  databaseURL: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  bcryptSaltRounds: JSON.parse(process.env.BCRYPT_SALT_ROUNDS),
  expiresAfterMinutes: JSON.parse(process.env.EXPIRES_AFTER_MINUTES),
  OTPLength: JSON.parse(process.env.OTP_LENGTH || 6),
  emailProvider: process.env.EMAIL_PROVIDER,
  emailUsername: process.env.EMAIL_ID,
  emailPassword: process.env.PASSWORD,
  version: getApplicationVersion(),
};

module.exports = { appConfig };
