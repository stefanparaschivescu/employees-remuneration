const csv = require("../controllers/csv.controller");
const router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/bankReport/:sourceAccountNumber/:paymentRef1/:urgent/:date", csv.download);

    app.use("/api/csv", router);
}
