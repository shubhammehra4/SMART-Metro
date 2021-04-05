const { spawn, exec } = require("child_process");

exports.findPath = (start, end) => {
    return new Promise((resolve, reject) => {
        const process = spawn("python", [
            "./pathFinder/findPath.py",
            start,
            end,
            10,
            "MONDAY",
            "Sunny",
        ]);
        const out = [];
        process.stdout.on("data", (data) => {
            let result = data.toString("utf8");
            console.log("In Model Calling");
            //! debug
            // console.log(result);
            result = result.split("\r\n");
            out.push({
                bfsRoute: result[1],
                Dist: result[3],
                dijktraRoute: result[5],
            });
            console.log("In Model Calling still..");
        });

        const err = [];
        process.stderr.on("data", (error) => {
            console.log(`Error: ${error}`);
            err.push(error.toString());
        });

        process.on("exit", (code, signal) => {
            console.log(
                `Child Process (findPaths.py) close all stdio with code ${code} & signal ${signal}`
            );
            resolve(out);
        });
    });
};

exports.getCrowd = (station, time, day, weather) => {
    return new Promise((resolve, reject) => {
        const process = spawn("python", [
            "./pathFinder/getCrowd.py",
            station,
            parseInt(time),
            day,
            weather,
        ]);
        const out = [];
        process.stdout.on("data", (data) => {
            let result = data.toString("utf8");
            out.push(result);
        });

        const err = [];
        process.stderr.on("data", (error) => {
            console.log(`Error: ${err}`);
            err.push(error.toString());
        });

        process.on("exit", (code, signal) => {
            console.log(
                `Child Process (getCrowd.py) close all stdio with code ${code} & signal ${signal}`
            );
            resolve(out);
        });
    });
};

exports.findPathExp = (start, end) => {
    return new Promise((resolve, reject) => {
        exec(
            `python ./pathFinder/findPath.py "${start}" "${end}" 10 MONDAY Sunny`,
            (err, stdout, stderr) => {
                console.log("In Model Calling");
                const out = [];

                if (err) {
                    console.error(err);
                    return;
                }
                let result = stdout.toString("utf8");
                result = result.split("\r\n");
                out.push({
                    bfsRoute: result[1],
                    Dist: result[3],
                    dijktraRoute: result[5],
                });
                console.log("In Model Calling still..");
                resolve(out);
            }
        );
    });
};
