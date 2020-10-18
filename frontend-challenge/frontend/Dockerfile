# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app-frontend

# install app dependencies
COPY package.json /app-frontend
COPY package-lock.json /app-frontend
RUN npm install

# Copy local code into the container
COPY . /app-frontend

# start app
CMD ["npm", "run", "start"]