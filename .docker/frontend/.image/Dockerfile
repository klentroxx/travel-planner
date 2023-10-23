FROM node:18.18.2-bullseye AS base

# Init basedir for the project
RUN mkdir /srv/dockerapp
WORKDIR /srv/dockerapp

# Copy startup script
COPY app.sh /dockerapp.sh
RUN chmod +x /dockerapp.sh

##################################
### Image for local development, with mounted filesystem
##################################
FROM base AS development

ENTRYPOINT [ "/dockerapp.sh" ]
CMD [ "start" ]
