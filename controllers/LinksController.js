const express = require('express');
const router = express.Router();
const ImageService = require('../services/ImageService');

const Link = require('../models/Link');
const slugify = require('slugify');

// Fetch All
router.get('/', (req, res) => {
  Link.find().sort({dateAdded: -1}).limit(25).then(links => {
    res.status(200).send(links);
  });
});

// Create new
router.post('/', (req, res) => {
  const { title, url, tags, description, opinion, source, related } = req.body;
  const slug = slugify(title.toLowerCase());

  (async () => {
    ImageService.sendUploadToGCS(req).then(imageUrl => {
      Link.create({
        title,
        url,
        tags,
        description,
        opinion,
        source,
        related,
        slug,
        imageUrl
      }).then(data => {
        console.log(data);
        return res.status(200).send({
          "success": data
        });
      }).catch(err => {
        console.log(err);
        return res.status(500).send({ "error": err });
      });
    });
  })();
});

// Fetch one
router.get('/:slug', (req, res) => {
  Link.find({ slug: req.params.slug}).then(data => {
    res.json(data);
  });
});

module.exports = router;