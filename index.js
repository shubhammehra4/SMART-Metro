const express = require("express"),
    path = require("path"),
    dotenv = require("dotenv"),
    app = express();

const { findPath, getCrowd } = require("./ml");
const { stationDetails, stationNames } = require("./stationNames");
dotenv.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "DEV";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/home", (req, res) => {
    res.render("home", { stationNames });
});

app.get("/homeDev", (req, res) => {
    res.render("homeDev", { stationNames: stationNames });
});

app.get("/map", (req, res) => {
    res.render("map");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.post("/findpath", async (req, res) => {
    try {
        const { start, end } = req.query;
        const result = await findPath(start, end);
        console.log(result);

        return res.status(200).json(result[0]);
    } catch (err) {
        return res.status(500).json({
            message: "Oops Something went wrong!",
            err,
        });
    }
});

app.post("/findpath/dev", async (req, res) => {
    try {
        let { start, day, time, weather } = req.body;
        const result = await getCrowd(start, time, day, weather);

        return res.status(200).json(result[0]);
    } catch (err) {
        return res.status(500).json({
            message: "Oops Something went wrong!",
            err,
        });
    }
});

app.listen(PORT, function () {
    console.log(`Running on http://localhost:${PORT} in ${NODE_ENV} env`);
});
