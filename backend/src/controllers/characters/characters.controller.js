const express = require('express');
const createError = require('http-errors');

exports.findAll = (req, res, next) => {
    return charactersService.findAll()
        .then(characterss => {
            res.json(characterss);
        });
};

exports.findOne = (req, res, next) => {
    return charactersService.findOne(req.params.id)
        .then(characters => {
            if (!characters) {
                return next(new createError.NotFound("Characters is not found"));
            }
            return res.json(characters);
        });
};
