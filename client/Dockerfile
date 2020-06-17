FROM node:alpine

# Add due to Docker/React app bug
ENV CI=true

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]