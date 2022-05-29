const pdf = require("../controllers/pdf.controller");
const router = require("express").Router();

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/", pdf.sendPdf);

    app.use("/api/pdf", router);
}