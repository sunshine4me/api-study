FROM node:12.18.1
WORKDIR /node_engine
COPY package*.json ./
COPY index.js ./
RUN npm install
CMD [ "node", "index.js" ]