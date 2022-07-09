const nodemailer = require("nodemailer")
const fs = require("fs")
const config = require("./config/config.json")

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
    console.log("Message Sent")
  } catch (e) {
    console.log("Something Broke", e)
  }
}

exports.deviceAlert = deviceAlert
