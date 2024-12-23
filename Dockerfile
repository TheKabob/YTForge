FROM node:20
RUN apt update && apt install -y yt-dlp ffmpeg postgresql postgresql-contrib
WORKDIR /app
COPY . .
RUN npm install

8080 node app, 5432 postgresql
EXPOSE 8080, 5432

CMD service postgresql start && node server.js

