const db = require("../models");
const Function = db.function;

exports.createFunction = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const _function = new Function({
        name: req.body.name
    });

    _function.save(_function).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Function."
        });
    });
};

exports.findFunctions = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("name")) query["name"] = query.name;

    Function.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving functions."
            });
        });
};

exports.findFunctionById = (req, res) => {
    const id = req.params.id;

    Function.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Function with id " + id });
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving Function with id=" + id });
        });
};

exports.updateFunction = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Function.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Function with id=${id}. Maybe Vacation was not found!`
                });
            } else res.send({ message: "Function was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Function with id=" + id
            });
        });
};

exports.deleteFunction = (req, res) => {
    const id = req.params.id;

    Function.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Function with id=${id}. Maybe Vacation was not found!`
                });
            } else {
                res.send({
                    message: "Function was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Function with id=" + id
            });
        });
};