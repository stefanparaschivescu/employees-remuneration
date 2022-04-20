const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.administrators = require("./administrator.model")(mongoose);
db.benefits = require("./benefit.model")(mongoose);
db.companies = require("./company.model")(mongoose);
db.document = require("./document.model")(mongoose);
db.employees = require("./employee.model")(mongoose);
db.expenses = require("./expense.model")(mongoose);
db.functions = require("./function.model")(mongoose);
db.payments = require("./payment.model")(mongoose);
db.requests = require("./request.model")(mongoose);
db.vacations = require("./vacation.model")(mongoose);

module.exports = db;