$(document).ready(function () {
    document.getElementById("mainSidenav").style.width = "360px";
});
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("secondSidenav").style.width = "360px";
    // $('#secondSidenav').show("slide", {direction: "right" });
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("secondSidenav").style.width = "0";
    if (user_coordinates == null) {
        $("#thirdSidenav").show();
    }
    // $('#secondSidenav').hide("slow");
}


function changePlaceData(data) {
}

function showFilter() {
    if ($('.filter-section').is(':visible')) {
        $('.filter-section').hide("slow");
    } else {
        $('.filter-section').show("slow");
    }

}