const express = require("express")
const app = express()
const port = 42069
const database = require("./database.js")
const config = require("./config/config.json")
const logger = require("./logger.js").loggerAPI
app.use(express.json())

app.put("/device", (req, res) => {
  logger.info(req.body)
  try {
    database.postIoT({ dvc_id: req.body.dvc_id, dvc_ip: req.body.dvc_ip })
  } catch (e) {
    logger.error(e)
  }
  res.send("OK")
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Application started.`)
  logger.info(`Application started.`)
})

setInterval(() => {
  database.checkIoT()
}, config.alertTimeout)
