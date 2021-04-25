// Vanilla JS
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#submit").addEventListener("click", function () {
        let start = document.querySelector("#start").value;
        let day = document.querySelector("#day").value;
        let time = document.querySelector("#time").value;
        let weather = document.querySelector("#weather").value;
        let body = { start, day, time, weather };
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

        if (start) {
            fadeIn(loader);
            fetch(`/findpath/dev`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    let crowd = document.querySelector("#crowd");
                    res = res.slice(1, -3);
                    crowd.innerHTML = res;
                    fadeOut(loader);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            document.querySelector("#start").focus();
        }
    });
});

// jQuery Equivalent
// $(document).ready(function () {
//     $("#submit").click(function () {
//         let start = $("#start").val();
//         let day = $("#day").val();
//         let time = $("#time").val();
//         let weather = $("#weather").val();
//         let body = { start, day, time, weather };
//         if (start) {
//             $(".loader").fadeIn();
//             fetch(`/findpath/dev`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             })
//                 .then((res) => res.json())
//                 .then((res) => {
//                     console.log(res);
//                     let crowd = $("#crowd");
//                     res = res.slice(1, -3);
//                     // console.log(res)
//                     $(".loader").fadeOut();
//                     crowd.html(res);
//                 })
//                 .catch((err) => {
//                     console.log("here");
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
