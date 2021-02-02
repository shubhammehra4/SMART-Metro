$(document).ready(function () {
    $("#submit").click(function () {
        let start = $("#start").val();
        let end = $("#end").val();
        if (start && end) {
            fetch(`/findpath?start=${start}&end=${end}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    let bfs = res.bfsRoute;
                    bfs = bfs.split(",");
                    let dijktra = res.dijktraRoute;
                    dijktra = dijktra.split(",");
                    let printBfs = bfs.map((n) => `<h1>${n}</h1>`);
                    let printDijktra = dijktra.map((n) => `<h1>${n}</h1>`);

                    $("#bfspath").html(printBfs);
                    $("#dfspath").html(printDijktra);
                    $("#sep").show();
                })
                .catch((err) => {
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
