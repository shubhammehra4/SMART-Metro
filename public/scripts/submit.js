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
                    let printBfs = bfs.map((n) => `<p>${n}</p><p>🔻</p>`);
                    let printDijktra = dijktra.map((n, i) => {
                        if (i < dijktra.length - 1) {
                            let d = details[n].details;
                            let line = d.line.join(", ");
                            let colors = d.line.map(
                                (l) => "." + l.split(" ")[0]
                            );
                            console.log(colors);
                            let res = "";
                            if (i === dijktra.length - 2) {
                                res += `<div class="station">
                                <h4>${n} (${line})</h4></div>`;
                            } else {
                                res = `<div class="station">
                            <h4>${n} (${line})</h4><h4>🔻</h4></div>`;
                            }
                            return res;
                        }
                        return;
                    });
                    let tablinks = document.getElementsByClassName("tablink");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].style.display = "block";
                    }
                    document.getElementById("defaultOpen").click();
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
