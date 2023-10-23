FROM mysql:8.0.34-debian AS base

### Copy startup script
COPY app.sh /dockerapp.sh
RUN chmod +x /dockerapp.sh

#
ENTRYPOINT [ "/dockerapp.sh" ]
CMD [ "mysqld" ]

##################################
### Image for local development, with mounted filesystem
##################################
FROM base AS development
