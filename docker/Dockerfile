# Dockerfile for danubetech/did-resolution-test-suite

FROM node:16-buster

RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

ADD . /opt/did-resolution-test-suite
RUN cd /opt/did-resolution-test-suite && npm install
RUN cd /opt/did-resolution-test-suite && node_modules/cypress/bin/cypress install

RUN chmod +x /opt/did-resolution-test-suite/docker/entrypoint.sh
ENTRYPOINT ["/opt/did-resolution-test-suite/docker/entrypoint.sh"]