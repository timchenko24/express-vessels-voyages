FROM node:12-alpine

COPY . /app
WORKDIR /app
COPY package.json package-lock.json wait.sh /app/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install

EXPOSE 3000
CMD /wait && npm run build
