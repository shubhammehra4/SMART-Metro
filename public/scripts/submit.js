$(document).ready(function () {
    $("#submit").click(function () {
        let start = $("#start").val();
        let end = $("#end").val();
        if (start && end) {
            $(".loader").fadeIn();
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
                    let printBfs = bfs.map((n) => `<h4>${n}</h4><h4>🔻</h4>`);
                    let printDijktra = dijktra.map(
                        (n) => `<h4>${n}</h4><h4>🔻</h4>`
                    );

                    $(".loader").fadeOut();
                    $("#bfspath").html(printBfs);
                    $("#dfspath").html(printDijktra);
                    $(".hid").show();
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
