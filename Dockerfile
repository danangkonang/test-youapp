FROM node:16.16.0
 
WORKDIR /app
 
COPY . .

RUN yarn install
 
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]