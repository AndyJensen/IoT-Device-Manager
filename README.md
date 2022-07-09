# IoT Manager and Device Heartbeat

## About
IoT Manager allows for devices to check-in with a central server. On check-in, the application stores the device hostname, IP address, and last check-in time in a MySQL database. The config allows for an `alertTimeout` to be defined and send email/text alerts if a device hasn't been seen longer than the timeout interval.

## Prerequisites
* MySQL server, see `docs/mysql.sql` for database user/table creation.
* Email credentials to the account you want to send alerts.
* A server that will host the IoT Manager
* One-to-many IoT devices or machines

## Install Process
### IoT Manager
1. Clone this repo to your server.
2. Rename `config-example.json` to `config.json`.
3. Fill in appropriate credentials to an email service provider and MySQL database.
4. Make `scripts/install_service.sh` executable with `chmod +x install_service.sh`
5. Enter the scripts directory and run `sudo ./install_service.sh` and follow the prompts.
6. Run `sudo systemctl enable <your service name>`
7. Run `sudo systemctl start <your service name>`
### IoT Devices
1. Copy scripts/device.sh to any machine you want to monitor.
2. Make device.sh executable with `chmod +x device.sh`
3. Edit the URL on the last line of the script to your IoT Manager API.
4. `sudo crontab -e` on that device and enter the following: `* * * * * /bin/bash /<path to device.sh>`. This will heartbeat to the IoT Manager API every minute.