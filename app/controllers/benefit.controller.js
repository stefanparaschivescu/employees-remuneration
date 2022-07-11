const db = require("../models");
const Benefit = db.benefit;

exports.createBenefit = (req, res) => {
    if (!req.body.name && !req.body.cost) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const benefit = new Benefit({
        name: req.body.name,
        cost: req.body.cost
    });

    benefit.save(benefit).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the benefit."
        });
    });
};

exports.findBenefits = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("name")) query["name"] = query.name;
    if (query.hasOwnProperty("cost")) query["cost"] = query.cost;

    Benefit.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving benefits."
            });
        });
};

exports.findBenefitById = (req, res) => {
    const id = req.params.id;

    Benefit.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found benefit with id " + id });
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving benefit with id=" + id });
        });
};

exports.updateBenefit = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Benefit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update benefit with id=${id}. Maybe benefit was not found!`
                });
            } else res.send({ message: "Benefit was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating benefit with id=" + id
            });
        });
};

exports.deleteBenefit = (req, res) => {
    const id = req.params.id;

    Benefit.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete benefit with id=${id}. Maybe benefit was not found!`
                });
            } else {
                res.send({
                    message: "Benefit was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete benefit with id=" + id
            });
        });
};