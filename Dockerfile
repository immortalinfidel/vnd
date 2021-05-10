# Build Stage 1
# This build created a staging docker image
#
FROM node:12 as appbuild

# Create app directory
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
# Bundle app source code
COPY . .

# Install NX (9.5.1)
RUN npm install -g @nrwl/cli@9.5.1 \
    && nx build vending-api --prod

RUN nx build vending --prod

# Build Stage 2
# This build takes the production build from appbuild build
#
FROM node:12-alpine






# Set to a non-root built-in user `node`
USER node

# Create app and configs directory (with user `node`)`
RUN mkdir -p /home/node/app \
    && mkdir -p /home/node/app/configs

WORKDIR /home/node/app

COPY --from=appbuild --chown=node /home/node/app/dist /home/node/app/dist
COPY --from=appbuild --chown=node /home/node/app/node_modules /home/node/app/node_modules

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3333



EXPOSE ${PORT}

CMD [ "node", "./dist/apps/vending-api/main.js" ]