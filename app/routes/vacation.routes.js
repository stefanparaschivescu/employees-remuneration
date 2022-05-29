const vacations = require("../controllers/vacation.controller");
const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", vacations.createVacation);
    router.get("/", vacations.findVacations);
    router.get("/id/:id", vacations.findVacationById);
    router.put("/id/:id", vacations.updateVacation);
    router.delete("/id/:id", vacations.deleteVacation);

    app.use('/api/vacations', router);
};