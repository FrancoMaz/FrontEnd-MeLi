# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app-frontend

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app-frontend
COPY package-lock.json /app-frontend
RUN npm install

# Copy local code into the container
COPY . /app-frontend

# start app
CMD ["npm", "run", "start"]