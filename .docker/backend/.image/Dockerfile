FROM node:18.18.2-bullseye AS base

RUN mkdir /srv/dockerapp
WORKDIR /srv/dockerapp

RUN apt-get update \
  # Install basics: CURL (for downloading), unzip (for downloaded packages), GOSU (for sudo like a boss), wait-for-it (to wait for services to boot up)
  && apt-get install -y curl unzip gosu wait-for-it


### Copy startup script
COPY app.sh /dockerapp.sh
RUN chmod +x /dockerapp*.sh

###
ENTRYPOINT [ "/dockerapp.sh" ]

##################################
### Image for local development, with mounted filesystem
##################################
FROM base AS development

CMD [ "start:dev" ]
