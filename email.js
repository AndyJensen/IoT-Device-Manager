const nodemailer = require("nodemailer")
const fs = require("fs")
const config = require("./config/config.json")
const logger = require("./logger.js").loggerEmail
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.auth
  }
})

async function deviceAlert(obj) {
  try {
    let info = await transporter.sendMail({
      from: `"${config.email.fromName}" <${config.email.user}>`,
      to: config.email.notificationRecipients,
      subject: "DEVICE OUTAGE!",
      text: obj
    })
    logger.info("Message Sent", obj)
  } catch (e) {
    logger.error(e)
  }
}

exports.deviceAlert = deviceAlert
