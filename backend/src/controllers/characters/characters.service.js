const characters = require('../../models/characters.model');

exports.findAll = () => Characters.find().populate('posts');

exports.findOne = id => Characters.findById(id).populate('posts');

