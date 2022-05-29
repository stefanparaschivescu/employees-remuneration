const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

// connect method
const db = require("./app/models");
const Role = db.role;
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
    initial();
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
    res.send('<h1>Welcome to Salary application.</h1>');
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/request.routes")(app);
require("./app/routes/vacation.routes")(app);
require("./app/routes/pdf.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}