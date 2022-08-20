FROM node:16

ARG APP_ENV=dev
ENV APP_ENV ${APP_ENV}

WORKDIR /usr/src/app

#Install App
COPY src .
COPY package.json .
COPY tsconfig.json .
COPY nodemon.json .
COPY jest.config.ts .
COPY yarn.lock .
COPY token.pem .

RUN yarn

COPY ./entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD /usr/local/bin/docker-entrypoint.sh $APP_ENV