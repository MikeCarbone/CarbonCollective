const express = require('express');
const router = express.Router();

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
  const { body: {title, url, tags, description, opinion, source, related} } = req;
  const slug = slugify(title.toLowerCase());

  Link.create({
    title,
    url,
    tags,
    description,
    opinion,
    source,
    related,
    slug
  }).then(data => {
    res.status(200).send({
      "success": data
    });
  }).catch(err => {
    res.status(500).send({ "error": err });
  });
});

// Fetch one
router.get('/:slug', (req, res) => {
  Link.find({ slug: req.params.slug}).then(data => {
    res.json(data);
  });
});

module.exports = router;