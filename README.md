This repository contains sample code for calling MCP's Identity and Access Management (IAM) service. This is not a full featured client library, but meant to be a starting point for implementing in your node app.

## 1. Before you get started

You'll need:

* Client ID / Secret
* Client authorized to access api.cimpress.io
* Permissions configured in IAM

^ For any of these talk to API Management via HipChat or Email

## 2. Running the sample

### Get the code

    git clone https://mcpstash.cimpress.net/scm/ce/iam-sample-nodejs.git
    cd iam-sample-nodejs

### Install runtime and dependencies

    nvm install && nvm use
    npm install

### Enter configuration values

    # Enter your client ID and secret in .env

### Start the app and view the console output

    node index.js

## 3. Common Issues

### Access Denied Error

If you get back a message that looks like the following, you should reach out to API management to get your client properly configured.

```
{ error: 'access_denied',
  error_description: 'Client is not authorized to access "https://development.api.cimpress.io". You might probably want to create a "client-grant" associated to this API. See: https://auth0.com/docs/api/v2#!/Client_Grants/post_client_grants' }
```
