$(document).ready(function () {
    $("#submit").click(function () {
        let start = $("#start").val();
        let end = $("#end").val();
        let day = $("#day").val();
        let time = $("#time").val();
        let weather = $("#weather").val();
        let body = { start, end, day, time, weather };
        if (start && end) {
            fetch(`/findpath/dev`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    //     let bfs = res.bfsRoute;
                    //     bfs = bfs.split(",");
                    //     let dijktra = res.dijktraRoute;
                    //     dijktra = dijktra.split(",");
                    //     let printBfs = bfs.map((n) => `<h4>${n}</h4><h4>🔻</h4>`);
                    //     let printDijktra = dijktra.map(
                    //         (n) => `<h4>${n}</h4><h4>🔻</h4>`
                    //     );

                    //     $("#bfspath").html(printBfs);
                    //     $("#dfspath").html(printDijktra);
                    //     $(".hid").show();
                })
                .catch((err) => {
                    console.log("here");
                    console.log(err);
                });
        } else {
            if (!start) {
                $("#start").focus();
            } else {
                $("#end").focus();
            }
        }
    });
});
