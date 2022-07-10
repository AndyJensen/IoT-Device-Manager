const { application } = require("express")
const log4js = require("log4js")
const config = require("./config/config.json")
log4js.configure({
  appenders: {
    default: {
      type: "dateFile",
      filename: `${config.logDirectory}application.log`,
      pattern: ".yyyy-MM-dd",
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["default"],
      level: "debug",
    },
  },
})

exports.loggerDefault = log4js.getLogger()
exports.loggerEmail = log4js.getLogger("EMAIL")
exports.loggerDatabase = log4js.getLogger("DB")
exports.loggerAPI = log4js.getLogger("API")