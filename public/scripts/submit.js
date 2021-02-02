$(document).ready(function () {
    $("#submit").click(function () {
        let start = $("#start").val();
        let end = $("#end").val();
        if (start && end) {
            console.log(start);
            fetch(`/findpath?start=${start}&end=${end}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    $("#respath").text("Machine is Learning right now!");
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
