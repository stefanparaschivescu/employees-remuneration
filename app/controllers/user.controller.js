const db = require("../models");
const User = db.user;

exports.findUsers = (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty("companyId")) query["companyId"] = query.companyId;
    if (query.hasOwnProperty("firstName")) query["firstName"] = query.firstName;
    if (query.hasOwnProperty("lastName")) query["lastName"] = query.lastName;
    if (query.hasOwnProperty("dateOfBirth")) query["dateOfBirth"] = query.dateOfBirth;
    if (query.hasOwnProperty("phoneNumber")) query["phoneNumber"] = query.phoneNumber;
    if (query.hasOwnProperty("gender")) query["gender"] = (query.gender === "true");
    if (query.hasOwnProperty("address")) query["address"] = query.address;
    if (query.hasOwnProperty("married")) query["married"] = (query.married === "true");
    if (query.hasOwnProperty("internalNumber")) query["internalNumber"] = query.internalNumber;
    if (query.hasOwnProperty("salary")) query["salary"] = query.salary;

    User.find(query)
        .populate("companyId", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .populate("companyId", "-__v")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};

exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};