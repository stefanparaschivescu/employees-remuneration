const requests = require("../controllers/request.controller");
const router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", requests.createRequest);
    router.get("/", requests.findRequests);
    router.get("/vacations", requests.findVacations);
    router.get("/benefits", requests.findBenefits);
    router.get("/benefitsByUserId/:id", requests.findBenefitsByUserId);
    router.get("/vacationsByUserId/:id", requests.findVacationsByUserId);
    router.get("/id/:id", requests.findRequestById);
    router.put("/id/:id", requests.updateRequest);
    router.delete("/id/:id", requests.deleteRequest);

    app.use('/api/requests', router);
};