const users = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/employee", users.createEmployee);
    router.get("/", users.findUsers);
    router.get("/salaries", users.retrieveUsersGrossSalaries);
    router.get("/seniority", users.retrieveUsersSeniority);
    router.get("/id/:id", users.findUserById);
    router.put("/id/:id", users.updateUser);
    router.delete("/id/:id", users.deleteUser);

    app.use('/api/users', router);
};