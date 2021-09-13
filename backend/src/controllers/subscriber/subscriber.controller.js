const express = require('express');
const createError = require('http-errors');

const subscriberModel = require('../../models/subscriber.model')

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

// Create a new subscriber.
exports.create = (req, res, next) => {
    if (!checkModel(subscriberModel, req.body, next)) {
        return;
    }

    const { name, postalCode, city, address, licence_id,
        licenced_seasons, seasons_left, amount, colleague } = req.body;

    const newSubscriber = {
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

    return subscriberService.create(newSubscriber)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return subscriberService.findAll()
        .then(subscribers => {
            res.json(subscribers);
        });
};

exports.findOne = (req, res, next) => {
    return subscriberService.findOne(req.params.id)
        .then(subscriber => {
            if (!subscriber) {
                return next(new createError.NotFound("Subscriber is not found"));
            }
            return res.json(subscriber);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    if (!checkModel(subscriberModel, req.body, next)) {
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
    return subscriberService.update(req.params.id, update)
        .then(subscriber => {
            res.json(subscriber);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return subscriberService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
