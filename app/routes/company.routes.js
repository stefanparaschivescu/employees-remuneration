const companies = require("../controllers/company.controller");
const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", companies.createCompany);
    router.get("/", companies.findCompanies);
    router.get("/id/:id", companies.findCompanyById);
    router.put("/id/:id", companies.updateCompany);
    router.delete("/id/:id", companies.deleteCompany);

    app.use('/api/companies', router);
};