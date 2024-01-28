const { overengineedBoxifier } = require("./overengineedBoxifier");
function getServerDetails() {
  const environment = appConfig.environment;
  const port = appConfig.port;
  const databaseName = appConfig.databaseName;
  const appName = appConfig.appName;
  const frontendURL = appConfig.frontendURL;
  const backendURL = appConfig.backendURL;
  const version = appConfig.version;

  const messages = [
    `Name - ${appName}`,
    `Version - ${version}`,
    `Status - Server is running on port ${port} in ${environment} environment.`,
    `Using database - ${databaseName}`,
    `Frontend URL - ${frontendURL}`,
    `Backend URL - ${backendURL}`,
  ];

  overengineedBoxifier(messages);
}

module.exports = { getServerDetails };
