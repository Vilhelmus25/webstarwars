const Colleague = require('../../models/colleague.model');

exports.create = colleagueData => {
    const colleague = new colleague(colleagueData);
    return colleague.save();
};

exports.findAll = () => Colleague.find().populate();

exports.findOne = id => Colleague.findById(id).populate();

exports.update = (id, updateData) => Colleague.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => Colleague.findByIdAndRemove(id);
