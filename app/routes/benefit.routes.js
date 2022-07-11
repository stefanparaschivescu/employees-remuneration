const benefits = require("../controllers/benefit.controller");
const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", benefits.createBenefit);
    router.get("/", benefits.findBenefits);
    router.get("/id/:id", benefits.findBenefitById);
    router.put("/id/:id", benefits.updateBenefit);
    router.delete("/id/:id", benefits.deleteBenefit);

    app.use('/api/benefits', router);
};