const express = require('express');
const createError = require('http-errors');

const colleagueModel = require('../../models/colleague.model')

const checkModel = (model, body, next) => {
    const validationErrors = new model(body).validateSync();
    if (validationErrors) {
        next(
            new createError.BadRequest(
                JSON.stringify({
                    message: `Schema validation error`,
                    error: validationErrors
                })
            )
        );
        return false;
    }
    return true;
};

// Create a new colleague.
exports.create = (req, res, next) => {
    if (!checkModel(colleagueModel, req.body, next)) {
        return;
    }

    const { name, postalCode, city, address, licence_id,
        licenced_seasons, seasons_left, amount, colleague } = req.body;

    const newColleague = {
        name,
        postalCode,
        city,
        address,
        licence_id,
        licenced_seasons,
        seasons_left,
        amount,
        colleague,
    };

    return colleagueService.create(newColleague)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return colleagueService.findAll()
        .then(colleagues => {
            res.json(colleagues);
        });
};

exports.findOne = (req, res, next) => {
    return colleagueService.findOne(req.params.id)
        .then(colleague => {
            if (!colleague) {
                return next(new createError.NotFound("Colleague is not found"));
            }
            return res.json(colleague);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    if (!checkModel(colleagueModel, req.body, next)) {
        return;
    }

    // const update = {             // nehogy felülírjak olyat amit nem adok meg, de meglátjuk
    //     name,
    //     postalCode,
    //     city,
    //     address,
    //     licence_id,
    //     licenced_seasons,
    //     seasons_left,
    //     amount,
    //     colleague,
    // };
    return colleagueService.update(req.params.id, update)
        .then(colleague => {
            res.json(colleague);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return colleagueService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
