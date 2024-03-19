#!/bin/sh

while [ -z "$NGINX_IP" ]
do
    echo "waiting for nginx"
    export NGINX_IP=$(getent hosts nginx | awk '{ print $1 }')
    sleep 5
done
sed -i "s/^NGINX_IP=.*/NGINX_IP=${NGINX_IP}/" /app/.env