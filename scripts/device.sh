#!/bin/bash
dvc_id=$(hostname)
dvc_ip=$(hostname -I)
arr=(${dvc_ip// /})
dvc_ip=${arr[0]}
theData='{"dvc_id": "'${dvc_id}'", "dvc_ip": "'${dvc_ip}'"}'
curl -H 'Content-Type: application/json' \
-X PUT \
-d "${theData}" http://192.168.1.152:42069/device