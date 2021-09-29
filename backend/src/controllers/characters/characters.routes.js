const express = require("express");
const charactersModel = require('../../models/characters.model')
const controller = require('../base/controller')(charactersModel);

const router = express.Router();

// read
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next);
});

module.exports = router;
