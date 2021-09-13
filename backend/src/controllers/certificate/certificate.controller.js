const express = require('express');
const createError = require('http-errors');

const certificateModel = require('../../models/certificate.model')

// Create a new certificate.
exports.create = (req, res, next) => {
    if (!checkModel(certificateModel, req.body, next)) {
        return;
    }

    const newCertificate = {
        name,
        taxNumber,
        headquarters,
        date,
        legalReference,
        director,
        subscriber: subscriber || []
    };

    return certificateService.create(newCertificate)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return certificateService.findAll()
        .then(certificates => {
            res.json(certificates);
        });
};

exports.findOne = (req, res, next) => {
    return certificateService.findOne(req.params.id)
        .then(certificate => {
            if (!certificate) {
                return next(new createError.NotFound("Certificate is not found"));
            }
            return res.json(certificate);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    if (!checkModel(certificateModel, req.body, next)) {
        return;
    }

    return certificateService.update(req.params.id, update)
        .then(certificate => {
            res.json(certificate);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return certificateService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};
