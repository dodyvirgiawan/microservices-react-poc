# Specify base image
FROM node:alpine

# Related to github issue when hosting create react app inside docker container in a kubernetes cluster
# https://github.com/facebook/create-react-app/issues/8688
# https://github.com/facebook/create-react-app/issues/11779
ENV CI=true
ENV WDS_SOCKET_PORT=0

# Workdir inside the image
WORKDIR /app

# Copy only the package json, and install deps
COPY package.json ./
RUN npm install

# Copy the index.js only
COPY ./ ./

# First run
CMD ["npm", "start"]