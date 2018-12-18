This repository contains sample code for calling Cimpress Access Management (COAM) service. This is not a full featured client library, but meant to be a starting point for implementing in your node app.

## 1. Before you get started

You'll need:

* Client ID / Secret (You can create one at https://developer.cimpress.io/clients/create if you need one)

## 2. Running the sample

### Get the code

    git clone git@cimpress.githost.io:puma/api-management/coam-sample-nodejs.git
    cd coam-sample-nodejs

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
  error_description: 'Client is not authorized to access "https://api.cimpress.io". You might probably want to create a "client-grant" associated to this API. See: https://auth0.com/docs/api/v2#!/Client_Grants/post_client_grants' }
```

## 4. Other Nodejs COAM packages you might want to check
* https://github.com/Cimpress/coam-client
