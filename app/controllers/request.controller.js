const db = require("../models");
const Request = db.request;

exports.createRequest = (req, res) => {
    if (!req.body.employeeId && (!req.body.vacationId || !req.body.benefitId)) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    const request = new Request({
        employeeId: req.body.employeeId,
        accepted: "false",
        message: ""
    });

    if (req.body.hasOwnProperty("administratorId")) request.administratorId = req.body.administratorId;
    if (req.body.hasOwnProperty("vacationId")) request.vacationId = req.body.vacationId;
    if (req.body.hasOwnProperty("benefitId")) request.benefitId = req.body.benefitId;

    request.save(request).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Request."
        });
    });
};

exports.findRequests = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("employeeId")) query["employeeId"] = query.employeeId;
    if (query.hasOwnProperty("administratorId")) query["administratorId"] = query.administratorId;
    if (query.hasOwnProperty("vacationId")) query["vacationId"] = query.vacationId;
    if (query.hasOwnProperty("benefitId")) query["benefitId"] = query.benefitId;
    if (query.hasOwnProperty("accepted")) query["accepted"] = (query.accepted === "true");

    Request.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving requests."
            });
        });
};

exports.findVacations = (req, res) => {
    Request.where("vacationId").ne(null)
        .populate("employeeId", "-__v")
        .populate("vacationId", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vacations."
            });
        });
};

exports.findBenefits = (req, res) => {
    Request.where("benefitId").ne(null)
        .populate("employeeId", "-__v")
        .populate("benefitId", "-__v")
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

exports.findVacationsByUserId = (req, res) => {
    const id = req.params.id;

    Request.where("vacationId").ne(null)
        .where("employeeId").equals(id)
        .populate("vacationId", "--v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vacations."
            });
        });
}

exports.findBenefitsByUserId = (req, res) => {
    const id = req.params.id;

    Request.where("benefitId").ne(null)
        .where("employeeId").equals(id)
        .populate("benefitId", "--v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving benefits."
            });
        });
}

exports.findRequestById = (req, res) => {
    const id = req.params.id;

    Request.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Request with id " + id});
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({message: "Error retrieving Request with id=" + id});
        });
};

exports.updateRequest = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Request.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Request with id=${id}. Maybe Request was not found!`
                });
            } else res.send({message: "Request was updated successfully."});
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Request with id=" + id
            });
        });
};

exports.deleteRequest = (req, res) => {
    const id = req.params.id;

    Request.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
                });
            } else {
                res.send({
                    message: "Request was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Request with id=" + id
            });
        });
};