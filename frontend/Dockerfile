FROM --platform=arm64 arm64v8/node:alpine3.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000