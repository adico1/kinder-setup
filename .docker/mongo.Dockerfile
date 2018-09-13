FROM mongo:latest
LABEL author="Adico"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY kinder-setup/.docker/mongo_scripts /usr/src/app
RUN chmod +rx /usr/src/app/*.sh
EXPOSE 27017
ENTRYPOINT ["/usr/src/app/db-setup.sh"]

# To build:
# docker build -f mongo.dockerfile --tag danwahlin/mongo ../

# To run the image (add -d if you want it to run in the background)
# docker run -p 27017:27017 --env-file .docker/mongo.development.env -d --name mongo danwahlin/mongo