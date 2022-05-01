const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.benefit = require("./benefit.model")(mongoose);
db.company = require("./company.model")(mongoose);
db.document = require("./document.model")(mongoose);
db.user = require("./user.model")(mongoose);
db.expense = require("./expense.model")(mongoose);
db.function = require("./function.model")(mongoose);
db.payment = require("./payment.model")(mongoose);
db.request = require("./request.model")(mongoose);
db.vacation = require("./vacation.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.ROLES = ["user", "admin"];

module.exports = db;