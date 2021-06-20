FROM node:12-alpine

WORKDIR /web

COPY /web/package.json .

RUN yarn install

COPY /web .

CMD ["yarn", "start"]