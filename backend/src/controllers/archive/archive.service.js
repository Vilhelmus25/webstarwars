const Archive = require('../../models/archive.model');

exports.create = archiveData => {
    const archive = new Archive(archiveData);
    return archive.save();
};

exports.findAll = () => Archive.find().populate();

exports.findOne = id => Archive.findById(id).populate();

exports.update = (id, updateData) => Archive.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Archive.findByIdAndRemove(id);
