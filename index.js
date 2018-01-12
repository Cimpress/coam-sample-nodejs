require('dotenv').config();
var request = require('request');
var jwt = require('jsonwebtoken');

getAuth0AccessToken(function(accessToken) {
  getIamPermissions("adfs|jdaviscooke@cimpress.com", "merchants", "vistaprint", accessToken, function(permissions) {
    console.log("===== RESPONSE =====");
    console.log(permissions);
  });
});

function getIamPermissions(principal, resourceType, resourceIdentifier, accessToken, callback) {

  console.log("Retrieving COAM permissions for " + principal + " on " + resourceType + " " + resourceIdentifier);
  console.log();

  var options = {
    url: "https://api.cimpress.io/auth/access-management/v1/principals/" + principal + "/permissions/" + resourceType + "/" + resourceIdentifier,
    // Alternative: get permissions for all merchants. This will be less performant if the sub has permissions for a large number of resources
    // url: "https://api.cimpress.io/auth/access-management/v1/principals/" + principal + "/permissions" + resourceType,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };

  request(options, function(err, resp, body) {
    if (err) throw err;

    // Sample response
    // body = {
    // 	"identifier": "vistaprint",
    // 	"permissions": ["create:order", "debug:order", "read:order", "update", "update:order"]
    // }

    return callback(body);
  });
}

function getAuth0AccessToken(callback) {
  var options = {
    url: "https://cimpress.auth0.com/oauth/token",
    method: "POST",
    json: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: 'https://api.cimpress.io/',  // Trailing slash is very important
      grant_type: 'client_credentials'
    }
  };

  console.log("Retrieving access token for client ID " + process.env.CLIENT_ID);
  request(options, function(err, resp, body) {
    if (err) throw err;

    var accessToken = body.access_token;
    if (!accessToken) {
      console.log(body);
      throw new Error(body.error);
    }
    console.log("Access Token: ", accessToken);

    var decoded = jwt.decode(accessToken);
    if (!decoded || !decoded.exp) throw new Error("Unable to decode access token");
    console.log("Decoded Token (for debug):", decoded);

    var expiresIn = decoded.exp - Math.floor(new Date() / 1000);
    console.log("This token expires in " + expiresIn + " seconds");
    console.log("HINT: You should cache it and retrieve a replacement a bit before the actual expiration.");

    return callback(accessToken);
  });
}
