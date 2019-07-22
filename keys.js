const keys = {
  "mongoURI": process.env.MONGO,
  "jwtKey": process.env.JWT_KEY,
  "adminUser": process.env.ADMIN_USER,
  "adminPass": process.env.ADMIN_PASS,
  "gCLoudUser": process.env.gCLOUD_USER,
  "gCloudProject": process.env.gCLOUD_PASS,
  "GOOGLE_APPLICATION_CREDENTIALS": {
    "type": "service_account",
    "project_id": "carboncollective",
    "private_key_id": process.env.gCLOUD_KEY_ID,
    "private_key": process.env.gCLOUD_KEY,
    "client_email": "mfcbone@carboncollective.iam.gserviceaccount.com",
    "client_id": process.env.gCLOUD_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mfcbone%40carboncollective.iam.gserviceaccount.com"
  },
  "TWITTER_consumer_key": process.env.TWITTER_consumer_key,
  "TWITTER_consumer_secret": process.env.TWITTER_consumer_secret,
  "TWITTER_access_token_key": process.env.TWITTER_access_token_key,
  "TWITTER_access_token_secret": process.env.TWITTER_access_token_secret
};

module.exports = keys;