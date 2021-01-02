const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.companies = require("./company.model.js")(mongoose);
db.jobs = require("./job.model.js")(mongoose);
db.salaries = require("./salary.model.js")(mongoose);
db.technologies = require("./technology.model.js")(mongoose);
db.reviews = require("./review.model.js")(mongoose);
db.questions = require("./question.model.js")(mongoose);
db.interviews = require("./interview.model.js")(mongoose);

module.exports = db;