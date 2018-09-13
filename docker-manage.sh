
# remove all running docker processes

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# docker image clean up

docker image rm -f $(docker image ls -q -a)

# update image

docker-compose up -d --no-deps --build components_app


# install vim
apt-get update
apt-get install vim


docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image rm components_app
docker-compose up

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' components_app
docker inspect --format '{{ .NetworkSettings.IPAddress }}' components_app

docker inspect components_app | grep '"IPAddress"' | head -n 1