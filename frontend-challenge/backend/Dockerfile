# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app-backend

# install app dependencies
COPY package.json /app-backend
COPY package-lock.json /app-backend
RUN npm install

# Copy local code into the container
COPY . /app-backend

# start app
CMD ["npm", "start"]