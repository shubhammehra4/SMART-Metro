$(document).ready(function () {
    $("#submit").click(function () {
        let start = $("#start").val();
        let day = $("#day").val();
        let time = $("#time").val();
        let weather = $("#weather").val();
        let body = { start, day, time, weather };
        if (start) {
            $(".loader").fadeIn();
            fetch(`/findpath/dev`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    let crowd = $("#crowd");

                    $(".loader").fadeOut();
                    crowd.html(res);
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
