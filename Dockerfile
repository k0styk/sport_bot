FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN NODE_ENV=development npm install
RUN npm run docker:build
RUN npm prune --production
CMD ["node", "./build/index.js"]
