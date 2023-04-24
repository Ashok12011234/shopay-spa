FROM quay.io/oauth2-proxy/oauth2-proxy:v7.2.0

# Copy the OAuth2 proxy configuration file to the container
COPY oauth2-proxy.cfg /etc/oauth2-proxy/

# Set the command to start the proxy and serve the app
CMD ["oauth2-proxy", "--config=/etc/oauth2-proxy/oauth2-proxy.cfg"]
