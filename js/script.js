// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
var placeService, autocomplete, placesList;
//var componentForm = {
//  street_number: 'short_name',
//  route: 'long_name',
//  locality: 'long_name',
//  administrative_area_level_1: 'short_name',
//  country: 'long_name',
//  postal_code: 'short_name'
//};

function initialize() {
//    console.info("initialize");
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById('ba_where')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
//    google.maps.event.addListener(autocomplete, 'place_changed', function () {
//        console.log(autocomplete.getPlace());
//    });

    placesList = document.getElementById('places');
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

function findPlaces() {
    // prepare variables (filter)
    var type = "store"; //document.getElementById('gmap_type').value;
    var radius = 5000; //document.getElementById('gmap_radius').value;
    var keyword = document.getElementById('ba_what').value; //I'm looking for...
    var lat = autocomplete.getPlace().geometry.location.lat();
    var lng = autocomplete.getPlace().geometry.location.lng();
    var cur_location = new google.maps.LatLng(lat, lng);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: radius,
        types: [type]
    };

    if (keyword) {
        request.keyword = [keyword];
    }

    placeService = new google.maps.places.PlacesService(placesList);
    placeService.search(request, callback);
}

//https://developers.google.com/maps/documentation/javascript/examples/place-search-pagination
//http://stackoverflow.com/questions/14343965/google-places-library-without-map

function callback(results, status, pagination) {

    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {

//        var placesListInnerHTML='<table><tbody>';
        var placesListInnerHTML='<ul class=\"alt\">';
        for (var i = 0, place; place = results[i]; i++) {
//            placesListInnerHTML += '<tr id=\"tr_' + place.place_id + '\"></tr>';
            placesListInnerHTML += '<li id=\"tr_' + place.place_id + '\"></li>';
        }
//        placesListInnerHTML+='</table></tbody>';
        placesListInnerHTML+='</ul>';
        placesList.innerHTML=placesListInnerHTML;

        for (var i = 0, place; place = results[i]; i++) {

//             document.getElementById('tr_' + place.place_id).innerHTML +=
//                '<td><input type=\"checkbox\" id=\"checkbox_' + place.place_id + '\"></td>';

            document.getElementById('tr_' + place.place_id).innerHTML +=
                '<input type=\"checkbox\" id=\"checkbox_' + place.place_id + '\">';
            document.getElementById('tr_' + place.place_id).innerHTML += place.name;

//            var photos = place.photos;
//            if (photos) {
//                document.getElementById('tr_' + place.place_id).innerHTML +=
////                '<td><span class=\"image left\"><img src=\"' + photos[0].getUrl({
//                    '<span class=\"image left\"><img src=\"' + photos[0].getUrl({
//                    'maxWidth': 120,
//                    'maxHeight': 160
//                }) + '\" alt=\"\" /></span>';
//            }
        }
        console.log(placesList.innerHTML);
    }
}


google.maps.event.addDomListener(window, 'load', initialize);
