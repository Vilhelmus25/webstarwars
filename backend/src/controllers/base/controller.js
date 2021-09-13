const express = require('express');
const createError = require('http-errors');

const baseService = require('../base/service');

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

module.exports = (model, populates = []) => {
    const currentService = baseService(model, populates);
    return {

        // Create a new Entity.
        create: (req, res, next) => {
            if (!checkModel(model, req.body, next)) {
                return;
            }

            return currentService.create(req.body)
                .then(cp => {
                    res.status(201);
                    res.json(cp);
                })
                .catch(err => next(new createError.InternalServerError(err.message)));
        },

        findAll: (req, res, next) => {
            return currentService.findAll()
                .then(entitys => {
                    res.json(entitys);
                });
        },

        findOne: (req, res, next) => {
            return currentService.findOne(req.params.id)
                .then(entity => {
                    if (!entity) {
                        return next(new createError.NotFound("Entity is not found"));
                    }
                    return res.json(entity);
                });
        },

        update: (req, res, next) => {
            const id = req.params.id;
            if (!checkModel(model, req.body, next)) {
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
            return currentService.update(req.params.id, req.body)
                .then(entity => {
                    res.json(entity);
                })
                .catch(err => {
                    next(new createError.InternalServerError(err.message));
                });
        },

        delete: (req, res, next) => {
            return currentService.delete(req.params.id)
                .then(() => res.json({}))
                .catch(err => {
                    next(new createError.InternalServerError(err.message));
                });
        },
    }
}
