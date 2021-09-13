const express = require('express');
const createError = require('http-errors');

const userService = require('./user.service');

// Create a new user.
exports.create = (req, res, next) => {
    const { last_name, first_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newUser = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    return userService.create(newUser)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return userService.findAll()
        .then(people => {
            res.json(people);
        });
};

exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)
        .then(user => {
            if (!user) {
                return next(new createError.NotFound("User is not found"));
            }
            return res.json(user);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };
    return userService.update(req.params.id, update)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
