const db = require("../models");
const Company = db.company;

exports.createCompany = (req, res) => {
    if (!req.body.CUI && !req.body.name && !req.body.address) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const company = new Company({
        CUI: req.body.CUI,
        name: req.body.name,
        address: req.body.address,
    });

    company.save(company).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Company."
        });
    });
};

exports.findCompanies = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("CUI")) query["CUI"] = query.CUI;
    if (query.hasOwnProperty("name")) query["name"] = query.name;
    if (query.hasOwnProperty("address")) query["address"] = query.address;

    Company.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving companies."
            });
        });
};

exports.findCompanyById = (req, res) => {
    const id = req.params.id;

    Company.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Company with id " + id });
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving Company with id=" + id });
        });
};

exports.updateCompany = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Company with id=${id}. Maybe Company was not found!`
                });
            } else res.send({ message: "Company was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};

exports.deleteCompany = (req, res) => {
    const id = req.params.id;

    Company.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
                });
            } else {
                res.send({
                    message: "Company was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Company with id=" + id
            });
        });
};