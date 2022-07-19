const functions = require("../controllers/function.controller");
const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", functions.createFunction);
    router.get("/", functions.findFunctions);
    router.get("/id/:id", functions.findFunctionById);
    router.put("/id/:id", functions.updateFunction);
    router.delete("/id/:id", functions.deleteFunction);

    app.use('/api/functions', router);
};