const CLOUD_BUCKET = 'carboncollective';
const keys = require('../keys.js');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ 
  projectId: 'carboncollective',
  credentials: keys.GOOGLE_APPLICATION_CREDENTIALS
});
const bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
async function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]

function sendUploadToGCS (req) {
  return new Promise((resolve, reject) => {
    
    const gcsname = Date.now() + req.files[0].originalname;
    const file = bucket.file(gcsname);
    const stream = file.createWriteStream({ metadata: { contentType: req.files[0].mimetype }, resumable: false });
    
    if (!req.files) {
      reject('No file attached');
    }
    
    stream.on('error', (err) => {
      reject(err);
    });
  
    stream.on('finish', () => {
      file.makePublic().then(() => {
          var url = getPublicUrl(gcsname)
          resolve(url);
      });
    });
  
    stream.end(req.files[0].buffer);
  });
}

// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 2 * 1024 * 1024 // no larger than 5mb
  }
});
// [END multer]

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};