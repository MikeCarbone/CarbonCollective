var Twitter = require('twitter');
var keys = require('../keys');

var client = new Twitter({
  consumer_key: keys.TWITTER_consumer_key,
  consumer_secret: keys.TWITTER_consumer_secret,
  access_token_key: keys.TWITTER_access_token_key,
  access_token_secret: keys.TWITTER_access_token_secret
});

async function sendTweet(status, slug, title, description, file){
    var tweet = '';
    if ((status !== '') && (status !== undefined) && (status !== 'undefined')){
      tweet = `${status} \n\nhttps://www.carboncollective.cc/cc/${slug}`;
    } else {
      tweet = `New addition to the Collective: ${title.toUpperCase()}.\n\n${description}\n\nhttps://www.carboncollective.cc/cc/${slug}`;
    }

    // Load your image
    const image = file[0].buffer;

    try {
      // Make post request on media endpoint. Pass file data as media parameter
      client.post('media/upload', {media: image}).then(media => {
        client.post('statuses/update', {
          "status": tweet,
          "media_ids": media.media_id_string
          }).then(data => {
            return data;
          }).catch(err => {
            console.log('status err', err);
            return err;
        });
      }).catch(err => {
        console.log('error: ', error);
        return err;
      });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
}

module.exports = sendTweet;
