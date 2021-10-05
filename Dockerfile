FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install --production

CMD ["node", "server.js", "-v"]