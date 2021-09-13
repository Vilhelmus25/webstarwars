const express = require('express');
const createError = require('http-errors');

const archiveModel = require('../../models/archive.model')

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

// Create a new archive.
exports.create = (req, res, next) => {
    if (!checkModel(archiveModel, req.body, next)) {
        return;
    }

    const newArchive = {
        name,
        postalCode,
        city,
        address,
        licence_id,
        licenced_seasons,
        amount,
        colleague,
    };

    return archiveService.create(newArchive)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return archiveService.findAll()
        .then(archives => {
            res.json(archives);
        });
};

exports.findOne = (req, res, next) => {
    return archiveService.findOne(req.params.id)
        .then(archive => {
            if (!archive) {
                return next(new createError.NotFound("Archive is not found"));
            }
            return res.json(archive);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    if (!checkModel(archiveModel, req.body, next)) {
        return;
    }

    return archiveService.update(req.params.id, update)
        .then(archive => {
            res.json(archive);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return archiveService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
