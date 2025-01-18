FROM node:20

RUN apt-get update && \
    apt-get install -y \
      bash \
      git git-lfs \
      wget curl procps \
      htop vim nano && \
    rm -rf /var/lib/apt/lists/*

USER 1000
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --chown=1000 ./ /app
RUN  npm i

CMD ["node", "index.js"]
