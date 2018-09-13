FROM node:8.11.4
RUN mkdir -p /usr/src/app
COPY react-loading-screen /usr/src/app/react-loading-screen
COPY react-material-ui-keyboard /usr/src/app/react-material-ui-keyboard
WORKDIR /usr/src/app/react-loading-screen
RUN npm install
EXPOSE 3000
CMD [ "sh", "start.sh" ]