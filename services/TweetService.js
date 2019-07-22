var Twitter = require('twitter');
var keys = require('../keys');

var client = new Twitter({
  consumer_key: keys.TWITTER_consumer_key,
  consumer_secret: keys.TWITTER_consumer_secret,
  access_token_key: keys.TWITTER_access_token_key,
  access_token_secret: keys.TWITTER_access_token_secret
});

async function sendTweet(status, slug, title, description){
  var tweet = '';
  if ((status !== '') && (status !== undefined) && (status !== 'undefined')){
    tweet = `${status} \n\nhttps://www.carboncollective.cc/cc/${slug}`;
  } else {
    tweet = `New addition to the Collective: ${title.toUpperCase()}.\n\n${description} https://www.carboncollective.cc/cc/${slug}`;
  }

  client.post('statuses/update', {
    "status": tweet
  }).then(data => {
    return data;
  }).catch(err => {
    return Promise.reject('err', err);
  });
}

module.exports = sendTweet;