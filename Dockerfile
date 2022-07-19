FROM node:18-alpine

RUN npm install -g yarn --force

# set working directory
WORKDIR /app

# Install app dependencies.
COPY package.json yarn.lock ./
RUN yarn install --production --cache-folder ./node_modules/

# Bundle app source
COPY . .
CMD ["yarn", "start"]