FROM node:10-alpine

RUN apk upgrade --update-cache --available && \
    apk --no-cache add --virtual builds-deps \
            build-base \
            python \
            openssl \
            make \
            sed && \
            rm -rf /var/cache/apk/*