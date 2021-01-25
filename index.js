const express = require("express"),
    bodyParser = require("body-parser"),
    compression = require("compression"),
    dotenv = require("dotenv"),
    app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "DEV";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//! Production
// app.use(compression);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, function () {
    console.log(`Running on http://locahost:${PORT} in ${NODE_ENV} env`);
});
