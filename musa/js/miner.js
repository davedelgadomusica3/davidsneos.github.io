var markers = [];
var queued_jobs = []
var routes = []
var user_coordinates = null;
var map = null;
var user_icon = null;
var comisaries_icon = "images/yellow_marker.png"
var caivas_icon = "images/orange_marker.png"
var uris_icon = "images/green_marker.png"
var police_icon = null;
var casa_igualdad_icon = null;
var health_icon = null;
var nearest_1 = null;
var nearest_1_distance = 100000000;
var directionsService = null;
var directionsDisplay = null;
var boundsArray = [];
$(document).ready(function () {




});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 4.6559, lng: -74.1 },
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#969696"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "gamma": "0.00"
                    },
                    {
                        "lightness": "74"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "3"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ff0000"
                    },
                    {
                        "saturation": "-65"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ff0000"
                    },
                    {
                        "saturation": "-75"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#525252"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });
    getLocation();
    user_icon = {
        url: "images/user_icon.png", // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    police_icon = {
        url: "images/police_icon.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    casa_igualdad_icon = {
        url: "images/casa_igualdad_icon.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }

    health_icon = {
        url: "images/health_icon.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    highlightLocations(map);
    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, { strokeWeight: 4 });
    });
}

//REVISED DATASET
function load_comisaries(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/comisarias_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {




            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                permanent = "NO";
                semi = "NO";
                diurna = "NO";
                if (comisary_data[9].trim().indexOf("X") !== -1) {
                    permanent = "SI";
                }
                if (comisary_data[10].trim().indexOf("X") !== -1) {
                    semi = "SI";
                }
                if (comisary_data[11].trim().indexOf("X") !== -1) {
                    diurna = "SI";
                }
                more_info = "<br/> COMISARIOS/AS => " + comisary_data[3] +
                    " <br/> " + "PERMANENTE 24 HORAS ? => " + permanent +
                    " <br/> " + "SEMI-PERMANENTE (7AM - 11AM) ? => " + semi +
                    " <br/>" + "DIURNAS (7AM - 4PM) ? => " + diurna;

                comisary = {
                    location: comisary_data[2].trim().toUpperCase(),

                    name: comisary_data[2].trim(),
                    address: comisary_data[8].trim(),
                    phone: comisary_data[4].trim() + " - " + comisary_data[5].trim() + " - " + comisary_data[7].trim(),
                    more_info: more_info

                };

                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }



            }


            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING



            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, comisaries_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_casas_igualdad(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/casas_igualdad_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[0].trim().toUpperCase(),

                    name: comisary_data[0].trim(),
                    address: comisary_data[1].trim(),
                    phone: comisary_data[2].trim(),
                    more_info: "<br> CORREO ELECTRONICO => " + comisary_data[3] + " <br> HORARIOS DE ATENCIÓN => " + comisary_data[4]
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }

            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING


            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, casa_igualdad_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_unidades_preprocesales(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/unidades_prepocesales_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[0].trim().toUpperCase(),

                    name: comisary_data[0].trim(),
                    address: comisary_data[1].trim(),
                    phone: comisary_data[2].trim(),
                    more_info: "<br> TIPO DE MODELO => " + comisary_data[4] + " <br> HORARIOS DE ATENCIÓN => " + comisary_data[5]
                };

                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }

            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING


            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, caivas_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_uris(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/uris_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[0].trim().toUpperCase(),

                    name: comisary_data[0].trim(),
                    address: comisary_data[1].trim(),
                    phone: comisary_data[2].trim() + " EXT." + comisary_data[3].trim(),
                    more_info: "<br> TIPO DE MODELO => " + comisary_data[4] + " <br> HORARIOS DE ATENCIÓN => " + comisary_data[5]
                    + " <br> DELITOS QUE CONOCE => " + comisary_data[6]
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }

            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING



            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, uris_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_caivas_capiv(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/caivas_capiv_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[1].trim().toUpperCase(),

                    name: comisary_data[0].trim(),
                    address: comisary_data[2].trim(),
                    phone: comisary_data[3].trim() + " EXT." + comisary_data[4].trim(),
                    more_info: "<br> TIPO DE MODELO => " + comisary_data[5] + " <br> HORARIOS DE ATENCIÓN => " + comisary_data[6]
                    + " <br> DELITOS QUE CONOCE => " + comisary_data[7]
                };

                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }

            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING



            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, caivas_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_cois(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/cois_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[1].trim().toUpperCase(),

                    name: comisary_data[0].trim() + " - " + comisary_data[1].trim(),
                    address: comisary_data[2].trim(),
                    phone: comisary_data[3].trim(),
                    more_info: "<br> HORARIOS DE ATENCIÓN => " + comisary_data[4]
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    console.log("ENTRO");
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO
                }


            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING



            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, health_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_caps(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/caps_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[1].trim().toUpperCase(),

                    name: comisary_data[0].trim(),
                    address: comisary_data[2].trim(),
                    phone: comisary_data[3].trim(),
                    more_info: "<br> HORARIOS DE ATENCIÓN => " + comisary_data[4]
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }
            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING


            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, health_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_estaciones_policia(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/estaciones_policia_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[1].trim().toUpperCase(),

                    name: comisary_data[0].trim() + " / " + comisary_data[1].trim(),
                    address: comisary_data[2].trim(),
                    phone: comisary_data[3].trim(),
                    more_info: "<br> HORARIOS DE ATENCIÓN => " + comisary_data[4]
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }
            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));




            // Modify MAP SHOWING


            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {
                queued_jobs.push(setTimeout(function (index) {
                    geocodeAddress(geocoder, comisaries[index]['address'], index, comisaries, map, police_icon);
                    console.log("ID" + index);
                }, 1000 + 1000 * i, i));
            }



        },
        dataType: "text"
    });

}
//REVISED DATASET
function load_cais(location) {
    comisaries = [];


    $.ajax({
        // url: "data/police_stations.html",
        url: "data/cais_bogota.csv",

        data: {},
        type: "GET",
        success: function (data) {

            console.log(data);
            var comisaries_csv = data.split("\n")
            console.log(comisaries_csv);

            for (var i = 1; i < comisaries_csv.length; i++) {
                comisary_data = comisaries_csv[i].split(",")
                comisary = {
                    location: comisary_data[1].trim().toUpperCase(),

                    name: comisary_data[2].trim() + " / " + comisary_data[3].trim(),
                    address: comisary_data[9].trim(),
                    phone: comisary_data[5].trim(),
                    more_info: "<br> EMAIL => " + comisary_data[7],
                    latitude: comisary_data[11].trim().slice(0, 1) + "." + comisary_data[11].trim().slice(1),
                    longitude: comisary_data[13].trim().slice(0, 3) + "." + comisary_data[13].trim().slice(3)
                };


                if (user_coordinates == null || user_coordinates == "") {

                    if (comisary.location.indexOf(location) !== -1 || location.toUpperCase().indexOf("ALL") !== -1) {
                        comisaries.push(comisary);
                    }

                } else {
                    comisaries.push(comisary);
                    //CALCULAR Y RENDER RUTA
                    //ENCONTRAR MAS CERCANO

                }

            }




            console.log(comisaries);
            console.log(JSON.stringify(comisaries));





            var geocoder = new google.maps.Geocoder();
            // //Getting Location From Address
            for (var i = 0; i < comisaries.length; i++) {

                geocodeAddress(geocoder, comisaries[i]['address'], i, comisaries, map, police_icon);
                console.log("ID" + i);

            }



        },
        dataType: "text"
    });

}


function geocodeAddress(geocoder, address,
    item_id, collection, map, icon) {

    if (collection[item_id].latitude != null) {
        console.log("LATITUDE GIVEN:" + collection[item_id].latitude);
        console.log("LONGITUDE GIVEN:" + collection[item_id].longitude);
        console.log("ADDRESS:" + collection[item_id].address);
        if (user_coordinates == null || user_coordinates == "") {
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(collection[item_id].latitude, collection[item_id].longitude),
                title: collection[item_id].address,
                icon: icon

            });

            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, "click", function (evt) {
                infoWindow.setContent(this.get('title'));
                infoWindow.open(map, this);
                setInfoWindow(icon, collection[item_id].name, collection[item_id].address, collection[item_id].phone, collection[item_id].more_info);
                calculateTwoPointsRoute
            });
            // setInfoWindow(icon, collection[item_id].name, collection[item_id].address, collection[item_id].phone, collection[item_id].more_info);
            markers.push(marker);
        } else {
            user_position = new google.maps.LatLng(user_coordinates.latitude, user_coordinates.longitude);
            point_position = new google.maps.LatLng(collection[item_id].latitude, collection[item_id].longitude);
            console.log("NAREST" + distance_between_points(user_position, point_position))
            if (distance_between_points(user_position, point_position) < nearest_1_distance) {
                nearest_1_distance = distance_between_points(user_position, point_position);

                nearest_1 = { latitude: collection[item_id].latitude, longitude: collection[item_id].longitude }
                deleteMarkers();
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(nearest_1.latitude, nearest_1.longitude),
                    title: collection[item_id].address,
                    icon: icon
                });
                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, "click", function (evt) {
                    infoWindow.setContent(this.get('title'));
                    infoWindow.open(map, this);

                });
                setInfoWindow(icon, collection[item_id].name, collection[item_id].address, collection[item_id].phone, collection[item_id].more_info);
                calculateTwoPointsRoute(map,
                    new google.maps.LatLng(user_coordinates.latitude, user_coordinates.longitude),
                    new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())

                );
                markers.push(marker);
            }

        }


    }

    geocoder.geocode({
        'address': address,
        componentRestrictions: {
            country: 'CO'

        }
    }, function (results, status) {
        if (status === 'OK') {


            console.log("LATITUDE BY ADDRESS:" + results[0].geometry.location.lat());
            console.log("LONGITUDE BY ADDRESS:" + results[0].geometry.location.lng());
            console.log("ADDRESS:" + collection[item_id].address);

            if (user_coordinates == null || user_coordinates == "") {
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: collection[item_id].address,
                    icon: icon
                });


                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, "click", function (evt) {
                    infoWindow.setContent(this.get('title'));
                    infoWindow.open(map, this);
                    setInfoWindow(icon, collection[item_id].name, collection[item_id].address, collection[item_id].phone, collection[item_id].more_info);

                });
                // 
                markers.push(marker);
            } else {
                user_position = new google.maps.LatLng(user_coordinates.latitude, user_coordinates.longitude);
                point_position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                console.log("NAREST" + distance_between_points(user_position, point_position))
                if (distance_between_points(user_position, point_position) < nearest_1_distance) {
                    nearest_1_distance = distance_between_points(user_position, point_position);
                    nearest_1 = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }
                    deleteMarkers();
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(nearest_1.latitude, nearest_1.longitude),
                        title: collection[item_id].address,
                        icon: icon
                    });

                    var infoWindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker, "click", function (evt) {
                        infoWindow.setContent(this.get('title'));
                        infoWindow.open(map, this);

                    });
                    setInfoWindow(icon, collection[item_id].name, collection[item_id].address, collection[item_id].phone, collection[item_id].more_info);
                    calculateTwoPointsRoute(map,
                        new google.maps.LatLng(user_coordinates.latitude, user_coordinates.longitude),
                        new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())

                    );
                    markers.push(marker);
                }



            }

        } else if (status === 'ZERO_RESULTS') {
            console.log("NOT FOUND");
        }
        else {
            console.log("ERROR");
            console.log("ERROR STATUS " + status);
        }
    });


}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {

    clearMarkers();
    markers = [];
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserCoordinates, errorLocation);

    } else {
        user_coordinates = null;
    }
}

function errorLocation() {
    user_coordinates = null;
    $("#mainSidenav").hide();
    $("#thirdSidenav").show();
    $("#thirdSidenav").css('width', '360px');
    console.log("PILAS");
}

function getUserCoordinates(position) {
    user_coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(user_coordinates.latitude, user_coordinates.longitude),

        icon: user_icon
    });

    moveToLocation(user_coordinates.latitude, user_coordinates.longitude);
}

function moveToLocation(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
}

function distance_between_points(point1, point2) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    return distance;
}

function showHealth() {
    clearJobs();
    deleteMarkers();

    console.log(user_coordinates);
    if (user_coordinates != null) {
        load_caps("ALL");
        load_cois("ALL");
    } else {
        load_caps($(".selectpicker").val().toUpperCase());
        load_cois($(".selectpicker").val().toUpperCase());

    }

};
function showPolice() {
    clearJobs();
    deleteMarkers();

    if (user_coordinates != null) {
        load_cais("ALL");
        load_estaciones_policia("ALL");
    } else {
        load_cais($(".selectpicker").val().toUpperCase());
        load_estaciones_policia($(".selectpicker").val().toUpperCase());
    }
};
function showCasaIgualdad() {
    clearJobs();
    deleteMarkers();

    if (user_coordinates != null) {
        load_casas_igualdad("ALL");
    } else {
        load_casas_igualdad($(".selectpicker").val().toUpperCase());
    }
};

function showComisaries() {
    clearJobs();
    deleteMarkers();

    if (user_coordinates != null) {
        load_comisaries("ALL");
    } else {
        load_comisaries($(".selectpicker").val().toUpperCase());
    }
}
function showCAIVAS() {
    clearJobs();
    deleteMarkers();

    if (user_coordinates != null) {
        load_caivas_capiv("ALL");
        load_unidades_preprocesales("ALL");
    } else {
        load_caivas_capiv($(".selectpicker").val().toUpperCase());
        load_unidades_preprocesales($(".selectpicker").val().toUpperCase());
    }
}
function showFiscalia() {
    clearJobs();
    deleteMarkers();

    if (user_coordinates != null) {
        load_uris("ALL");
    } else {
        load_uris($(".selectpicker").val().toUpperCase());
    }
}

function clearJobs() {
    for (var i = 0; i < queued_jobs.length; i++) {
        clearTimeout(queued_jobs[i]);
    }
    nearest_1 = null;
    nearest_1_distance = 10000000;
}

function setInfoWindow(icon, name, address, phone, more_info) {
    $("#thirdSidenav").hide();
    openNav();
    $("#place_name").html(name);
    $("#place_address_val").html(address);
    $("#place_phone_val").html(phone);
    $("#place_info_val").html(more_info);


}


// ARKA


function calculateTwoPointsRoute(map, latlong_origin, latlong_dest) {


    directionsDisplay.setMap(null);
    directionsDisplay.setDirections({ routes: [] });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: latlong_origin,
        destination: latlong_dest,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function highlightLocations(map) {
    map.data.loadGeoJson("data/local.json");
    addBounds(map);
    locationListeners(map);
}

function addBounds(map) {

    google.maps.event.addListener(map.data, 'addfeature', function (e) {

        if (e.feature.getGeometry().getType() === 'Polygon') {
            var bounds = new google.maps.LatLngBounds();

            e.feature.getGeometry().getArray().forEach(function (path) {

                path.getArray().forEach(function (latLng) { bounds.extend(latLng); })

            });
            e.feature.setProperty('bounds', bounds);

        }
        fillBoundsArray(bounds, e);

        map.data.setStyle({
            fillColor: '#eee',
            strokeWeight: 1
        });
    });

}

function locationListeners(map) {
    google.maps.event.addListener(map.data, 'click', function (e) {
        var bounds = e.feature.getProperty('bounds');
        if (bounds) {
            //alert('bounds:\n'+bounds.toString());
            map.fitBounds(bounds);
        }
    });
}

function removeHighlightLocations(map) {
    map.data.forEach(function (feature) {
        map.data.remove(feature);
    });
}

function setBoundsOnLocation(map, location_name) {

    var obj = JSON.parse("local.json");
    console.log(obj);
}

//ARKA 2

function setBoundsOnLocation(map, location_name) {

    console.log(boundsArray);
    for (var i = 0; i < boundsArray.length; i++) {
        if (boundsArray[i].name === location_name) {
            map.fitBounds(boundsArray[i].bounds);
        }
    }

    boundsArray.forEach(function (bounds, name) {
        console.log("bounds" + bounds + name);
        if (name === location_name) {
            map.fitBounds(bounds);
        }
    })
}

function fillBoundsArray(bounds, e) {
    boundsArray.push({
        bounds: bounds,
        name: e.feature.getProperty('NOMBRE')
    });
}


function centerMapOnLocation(location) {
    setBoundsOnLocation(map, location);
}