const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
const Role = db.role;

const calculateNetSalary = (grossSalary, payTax) => {
    let cas = Math.round(0.25 * grossSalary);
    let cass = Math.round(0.1 * grossSalary);
    let taxes = Math.round(0.1 * (grossSalary - cas - cass));

    if (!payTax) {
        taxes = 0;
    }

    return Math.round(grossSalary - cas - cass - taxes);
}

exports.createEmployee = (req, res) => {
    if (!req.body.companyId && !req.body.email && !req.body.passwordToken && !req.body.role) {
        res.status(400).send({message: "Employee must be associated with a company, have an email and a password."});
        return;
    }

    let roleId = "";
    Role.findOne({name: "user"}, (err, role) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        roleId = role.id;
    });

    const user = new User({
            companyId: req.body.companyId,
            emailAddress: req.body.emailAddress,
            passwordToken: bcrypt.hashSync(req.body.passwordToken, 8),
            vacationDays: 21,
            role: "62d04dced53bf909bc25fbad"
        }
    );

    if (req.body.hasOwnProperty("firstName")) user.firstName = req.body.firstName;
    if (req.body.hasOwnProperty("lastName")) user.lastName = req.body.lastName;
    if (req.body.hasOwnProperty("dateOfBirth")) user.dateOfBirth = req.body.dateOfBirth;
    if (req.body.hasOwnProperty("phoneNumber")) user.phoneNumber = req.body.phoneNumber;
    if (req.body.hasOwnProperty("gender")) user.gender = (req.body.gender === "true");
    if (req.body.hasOwnProperty("address")) user.address = req.body.address;
    if (req.body.hasOwnProperty("married")) user.married = (req.body.married === "true");
    if (req.body.hasOwnProperty("internalNumber")) user.internalNumber = req.body.internalNumber;
    if (req.body.hasOwnProperty("grossSalary")) user.grossSalary = req.body.grossSalary;
    if (req.body.hasOwnProperty("mealTicketValue")) user.mealTicketValue = req.body.mealTicketValue;
    if (req.body.hasOwnProperty("IBAN")) user.IBAN = req.body.IBAN.toUpperCase();
    if (req.body.hasOwnProperty("BIC")) user.BIC = req.body.BIC.toUpperCase();
    if (req.body.hasOwnProperty("vacationDays")) user.vacationDays = req.body.vacationDays;
    req.body.hasOwnProperty("taxExempt") ? user.taxExempt = (req.body.taxExempt === true) : user.taxExempt = false;
    user.netSalary = calculateNetSalary(user.grossSalary, !user.taxExempt);

    user.save(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    });
};

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
    if (query.hasOwnProperty("grossSalary")) query["grossSalary"] = query.grossSalary;
    if (query.hasOwnProperty("netSalary")) query["netSalary"] = query.netSalary;
    if (query.hasOwnProperty("mealTicketValue")) query["mealTicketValue"] = query.mealTicketValue;
    if (query.hasOwnProperty("IBAN")) query["IBAN"] = query.IBAN;
    if (query.hasOwnProperty("BIC")) query["BIC"] = query.BIC;
    if (query.hasOwnProperty("vacationDays")) query["vacationDays"] = query.vacationDays;
    if (query.hasOwnProperty("taxExempt")) query["taxExempt"] = (query.taxExempt === "true");

    User.find(query)
        .populate("companyId", "-__v")
        .populate("functionId", "-__v")
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

exports.retrieveUsersGrossSalaries = (req, res) => {
    User.find({}, "grossSalary")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}

exports.retrieveUsersSeniority = (req, res) => {
    User.find({}, "createdAt")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}

exports.findUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .populate("companyId", "-__v")
        .populate("functionId", "--v")
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found User with id " + id});
            else {
                data.passwordToken = undefined;
                res.send(data);
            }
        })
        .catch(() => {
            res
                .status(500)
                .send({message: "Error retrieving User with id=" + id});
        });
};

exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    req.body.grossSalary && (req.body.netSalary = calculateNetSalary(req.body.grossSalary, !req.body.taxExempt));
    req.body.IBAN && (req.body.IBAN = req.body.IBAN.toUpperCase());
    req.body.BIC && (req.body.BIC = req.body.BIC.toUpperCase());

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({message: "User was updated successfully."});
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