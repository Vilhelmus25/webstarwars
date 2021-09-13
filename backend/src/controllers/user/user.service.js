const User = require('../../models/user.model');

exports.create = userData => {
    const user = new User(userData);
    return user.save();
};

exports.findAll = () => User.find().populate('posts');

exports.findOne = id => User.findById(id).populate('posts');

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => User.findByIdAndRemove(id);
