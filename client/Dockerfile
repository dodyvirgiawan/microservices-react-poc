# Specify base image
FROM node:alpine

# Workdir inside the image
WORKDIR /app

# Copy only the package json, and install deps
COPY package.json ./
RUN npm install

# Copy the index.js only
COPY ./ ./

# First run
CMD ["npm", "start"]