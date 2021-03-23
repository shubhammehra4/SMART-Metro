const express = require("express"),
    path = require("path"),
    dotenv = require("dotenv"),
    spawn = require("child_process").spawn,
    app = express();

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
        var resData = {};
        const { start, end } = req.query;
        var process = await spawn("python", [
            "./pathFinder/findPath.py",
            start,
            end,
            10,
            "MONDAY",
            "Sunny",
        ]);

        process.stderr.on("data", (err) => {
            console.log(`Error: ${err}`);
        });

        process.stdout.on("data", (data) => {
            let result;
            result = data.toString();
            console.log(result);
            result = result.split("\r\n");

            resData = { ...resData, bfsRoute: result[1] };
            resData = { ...resData, Dist: result[3] };
            resData = { ...resData, dijktraRoute: result[5] };
        });

        process.on("close", (code) => {
            console.log(
                `Child Process (findPaths.py) close all stdio with code ${code}`
            );
            console.log("Final", resData);
            return res.status(200).json(resData);
        });
    } catch (err) {
        return res.status(500).json({
            message: "Oops Something went wrong!",
            err,
        });
    }
});

app.post("/findpath/dev", (req, res) => {
    let { start, day, time, weather } = req.body;

    var process = spawn("python", [
        "./pathFinder/getCrowd.py",
        start,
        parseInt(time),
        day,
        weather,
    ]);
    process.stderr.on("data", (err) => {
        console.log(`Error: ${err}`);
    });

    process.stdout.on("data", (data) => {
        result = data.toString();
        console.log(result);
        return res.status(200).json(result);
    });

    process.on("close", (code) => {
        console.log(
            `Child Process (getPaths.py) close all stdio with code ${code}`
        );
    });
});

app.listen(PORT, function () {
    console.log(`Running on http://localhost:${PORT} in ${NODE_ENV} env`);
});
