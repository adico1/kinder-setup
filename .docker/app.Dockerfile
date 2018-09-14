FROM node:8.11.4
RUN mkdir -p /usr/src/app
COPY react-loading-screen /usr/src/app/react-loading-screen
COPY react-material-ui-keyboard /usr/src/app/react-material-ui-keyboard
WORKDIR /usr/src/app/react-loading-screen
RUN rm -rf /usr/src/app/react-loading-screen/package-lock.json
RUN npm install
RUN ls -alt /usr/src/app/react-loading-screen
RUN chmod +rx /usr/src/app/react-loading-screen/*.sh
EXPOSE 3000
ENTRYPOINT ["/usr/src/app/react-loading-screen/start.sh"]