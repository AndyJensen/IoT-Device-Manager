// get the client
const mysql = require("mysql")
const config = require("./config/config.json")
const email = require("./email.js")
const logger = require("./logger.js").loggerDatabase
let connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.database
})

connection.connect()

function checkIoT() {
  logger.debug("Performing device timeout check.")
  try {
    connection.query(
      "select a.dvc_id, a.dvc_ip, a.updt_tmstp, current_timestamp as cur_tmstp from iot_device a",
      function (error, results, fields) {
        if (error) throw error
        for (let i = 0; i < results.length; i++) {
          let dateA = results[i].updt_tmstp
          let dateB = results[i].cur_tmstp
          let dvc_id = results[i].dvc_id
          if (
            dateB - dateA > config.alertTimeout &&
            config.alertHosts.includes(dvc_id)
          ) {
            let alert = `${dvc_id} has not been seen for ${Math.round(
              (dateB - dateA) / 1000 / 60
            )} minutes.`
            logger.warn(alert)
            email.deviceAlert(alert)
          }
        }
      }
    )
  } catch (e) {
    logger.error(e)
  }
}

exports.checkIoT = checkIoT

function postIoT(val) {
  logger.debug("Performing device check-in.")
  try {
    if (val.dvc_id.length > "50" || val.dvc_ip.length > 20) {
      throw "dvc_id or dvc_ip overlength, skipping post"
    }
    let sql = `insert into iot_device
    (dvc_id, dvc_ip, updt_tmstp)
    values
    ('${val.dvc_id}', '${val.dvc_ip}', current_timestamp)
    on duplicate key update
    dvc_ip = '${val.dvc_ip}', updt_tmstp = current_timestamp;`
    connection.query(sql)
  } catch (e) {
    logger.error(e)
  }
}

exports.postIoT = postIoT
