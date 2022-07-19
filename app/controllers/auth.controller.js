const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
    const user = new User({
        companyId: req.body.companyId,
        emailAddress: req.body.email,
        passwordToken: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (req.body.role) {
            Role.find(
                {
                    name: {$in: req.body.role}
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    user.role = role.map(role => role.id);
                    user.save(user).then(data => {
                        console.log(data);
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while signing up."
                        })
                    })
                }
            );
        } else {
            res.status(404).send({
                message: "User must be associated with a role."
            })
        }
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        emailAddress: req.body.email,
    })
        .populate("role", "-__v")
        .populate("companyId", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.passwordToken
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).send({
                id: user.id,
                companyId: user.companyId,
                emailAddress: user.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                accessToken: token,
                vacationDays: user.vacationDays
            });
        });
};