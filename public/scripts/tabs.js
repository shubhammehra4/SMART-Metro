function openPage(pageName, elmnt) {
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    elmnt.style.backgroundColor = "blue";
    document.getElementById(pageName).style.display = "block";
}
