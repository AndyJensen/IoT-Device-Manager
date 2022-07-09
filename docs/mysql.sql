CREATE USER 'xxxxxxxx'@'%' IDENTIFIED BY 'xxxxxxxx';
GRANT ALL PRIVILEGES ON xxxxxxxx.iot_device TO 'xxxxxxxx'@'%';
FLUSH PRIVILEGES;

CREATE TABLE `iot_device` (
`dvc_id` VARCHAR(50) NOT NULL,
`dvc_ip` VARCHAR(20) NOT NULL,
`updt_tmstp` DATETIME NOT NULL,
PRIMARY KEY (`dvc_id`)
);