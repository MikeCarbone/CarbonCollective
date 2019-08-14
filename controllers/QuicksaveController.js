const express = require('express');
const router = express.Router();

const Quicksave = require('../models/Quicksave');

router.post('/', (req, res) => {
  const { url } = req.body;
  Quicksave.create({ url })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      res.status(500).send({ err });
    });
});

router.get('/', (req, res) => {
  Quicksave.find().limit(30).sort({dateAdded: -1})
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      res.status(500).send({ err });
    });
});

module.exports = router;
