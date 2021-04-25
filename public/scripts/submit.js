document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#submit").addEventListener("click", function () {
        let start = document.querySelector("#start").value;
        let end = document.querySelector("#end").value;
        let loader = document.querySelector(".loader");

        function fadeOut(el) {
            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= 0.1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }

        function fadeIn(el, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += 0.1) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        }

        if (start && end) {
            fadeIn(loader);
            fetch(`/findpath?start=${start}&end=${end}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    let bfs = res.bfsRoute;
                    bfs = bfs.split(",");
                    let dijktra = res.dijktraRoute;
                    dijktra = dijktra.split(",");

                    let printBfs = bfs.reduce((prev, curr, i) => {
                        if (i < bfs.length - 1) {
                            let d = details[curr].details;
                            let line = d.line.join(", ");

                            if (i === bfs.length - 2) {
                                return (
                                    prev +
                                    `<div class="station"> <h4>${curr} (${line})</h4></div>`
                                );
                            }
                            return (
                                prev +
                                `<div class="station"> <h4>${curr} (${line})</h4><h4>🔻</h4></div>`
                            );
                        }
                        return prev;
                    }, "");

                    let printDijktra = dijktra.reduce((prev, curr, i) => {
                        if (i < dijktra.length - 1) {
                            let d = details[curr].details;
                            let line = d.line.join(", ");
                            // Pending
                            // let colors = d.line.map(
                            //     (l) => "." + l.split(" ")[0]
                            // );
                            if (i === dijktra.length - 2) {
                                return (
                                    prev +
                                    `<div class="station"> <h4>${curr} (${line})</h4></div>`
                                );
                            } else {
                                return (
                                    prev +
                                    `<div class="station"> <h4>${curr} (${line})</h4><h4>🔻</h4></div>`
                                );
                            }
                        }
                        return prev;
                    }, "");

                    let tablinks = document.getElementsByClassName("tablink");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].style.display = "block";
                    }
                    document.getElementById("defaultOpen").click();
                    document.querySelector("#bfspath").innerHTML = printBfs;
                    document.querySelector("#dfspath").innerHTML = printDijktra;
                    fadeIn(document.querySelector(".hid"));
                    fadeOut(loader);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            if (!start) {
                document.querySelector("#start").focus();
            } else {
                document.querySelector("#end").focus();
            }
        }
    });
});

// jQuery Equivalent
// $(document).ready(function () {
//     $("#submit").click(function () {
//         let start = $("#start").val();
//         let end = $("#end").val();
//         if (start && end) {
//             $(".loader").fadeIn();
//             fetch(`/findpath?start=${start}&end=${end}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//             })
//                 .then((res) => res.json())
//                 .then((res) => {
//                     console.log(res);
//                     let bfs = res.bfsRoute;
//                     bfs = bfs.split(",");
//                     let dijktra = res.dijktraRoute;
//                     dijktra = dijktra.split(",");
//                     let printBfs = bfs.map((n, i) => {
//                         if (i < bfs.length - 1) {
//                             let d = details[n].details;
//                             let line = d.line.join(", ");
//                             let res = "";
//                             if (i === bfs.length - 2) {
//                                 res += `<div class="station">
//                                 <h4>${n} (${line})</h4></div>`;
//                             } else {
//                                 res = `<div class="station">
//                             <h4>${n} (${line})</h4><h4>🔻</h4></div>`;
//                             }
//                             return res;
//                         }
//                         return;
//                     });
//                     let printDijktra = dijktra.map((n, i) => {
//                         if (i < dijktra.length - 1) {
//                             let d = details[n].details;
//                             let line = d.line.join(", ");
//                             let colors = d.line.map(
//                                 (l) => "." + l.split(" ")[0]
//                             );
//                             // console.log(colors);
//                             let res = "";
//                             if (i === dijktra.length - 2) {
//                                 res += `<div class="station">
//                                 <h4>${n} (${line})</h4></div>`;
//                             } else {
//                                 res = `<div class="station">
//                             <h4>${n} (${line})</h4><h4>🔻</h4></div>`;
//                             }
//                             return res;
//                         }
//                         return;
//                     });
//                     let tablinks = document.getElementsByClassName("tablink");
//                     for (i = 0; i < tablinks.length; i++) {
//                         tablinks[i].style.display = "block";
//                     }
//                     document.getElementById("defaultOpen").click();
//                     $(".loader").fadeOut();
//                     $("#bfspath").html(printBfs);
//                     $("#dfspath").html(printDijktra);
//                     $(".hid").show();
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             if (!start) {
//                 $("#start").focus();
//             } else {
//                 $("#end").focus();
//             }
//         }
//     });
// });
