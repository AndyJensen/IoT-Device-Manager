#!/bin/bash
filePath="/etc/systemd/system/"
echo "What do you want to name the service?"
read fileName
echo "What command do you want to execute?"
echo "(example: /bin/bash /opt/andy/autofactory/test.sh)"
read userCommand
if [ -f "${filePath}${fileName}.service" ]; then
  echo "Service exists, install halting."
else
  echo "[Unit]" >> ${filePath}${fileName}.service;
  echo "Description=Testy test." >> ${filePath}${fileName}.service;
  echo "" >> ${filePath}${fileName}.service;
  echo "[Service]" >> ${filePath}${fileName}.service;
  echo "Type=simple" >> ${filePath}${fileName}.service;
  echo "ExecStart="${userCommand} >> ${filePath}${fileName}.service;
  echo "" >> ${filePath}${fileName}.service;
  echo "[Install]" >> ${filePath}${fileName}.service;
  echo "WantedBy=multi-user.target" >> ${filePath}${fileName}.service;
  chmod 644 ${filePath}${fileName}.service
  systemctl enable ${fileName}.service
  echo "Service created."
fi