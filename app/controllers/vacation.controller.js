const db = require("../models");
const Vacation = db.vacation;

exports.createVacation = (req, res) => {
    if (!req.body.days && !req.body.startingDate && !req.body.vacationType) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const vacation = new Vacation({
        days: req.body.days,
        startingDate: req.body.startingDate,
        vacationType: req.body.vacationType
    });

    vacation.save(vacation).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Vacation."
        });
    });
};

exports.findVacations = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("days")) query["days"] = query.days;
    if (query.hasOwnProperty("startingDate")) query["startingDate"] = query.startingDate;
    if (query.hasOwnProperty("vacationType")) query["vacationType"] = query.vacationType;

    Vacation.find(query)
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

exports.findVacationById = (req, res) => {
    const id = req.params.id;

    Vacation.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Vacation with id " + id });
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving Vacation with id=" + id });
        });
};

exports.updateVacation = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Vacation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Vacation with id=${id}. Maybe Vacation was not found!`
                });
            } else res.send({ message: "Vacation was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Vacation with id=" + id
            });
        });
};

exports.deleteVacation = (req, res) => {
    const id = req.params.id;

    Vacation.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Vacation with id=${id}. Maybe Vacation was not found!`
                });
            } else {
                res.send({
                    message: "Vacation was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Vacation with id=" + id
            });
        });
};