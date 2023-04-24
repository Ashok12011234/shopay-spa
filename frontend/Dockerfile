# Base image for your frontend app
FROM node:14-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the app
RUN npm run build

# Base image for your proxy
FROM quay.io/oauth2-proxy/oauth2-proxy:v7.2.0

# Copy the OAuth2 proxy configuration file to the container
COPY oauth2-proxy.cfg /etc/oauth2-proxy/

# Copy the built app files to the container
COPY --from=build /app/build /app

# Set the command to start the proxy and serve the app
CMD ["oauth2-proxy", "--config=/etc/oauth2-proxy/oauth2-proxy.cfg"]
