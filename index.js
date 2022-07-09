const express = require("express")
const app = express()
const port = 42069
const database = require("./database.js")
const config = require("./config/config.json")
app.use(express.json())

app.put("/device", (req, res) => {
  console.log(req.body)
  database.postIoT({ dvc_id: req.body.dvc_id, dvc_ip: req.body.dvc_ip })
  res.send("OK")
})

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
})

setInterval(() => {
    database.checkIoT()
}, config.alertTimeout)
