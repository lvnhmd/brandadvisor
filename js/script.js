var placeService, autocomplete, placesList;

function initialize() {
//    console.info("initialize");
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById('ba_where')), {
            types: ['geocode']
        });

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
    var type = "store";
    var radius = 5000;
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

        var placesListInnerHTML= '';
        for (var i = 0, place; place = results[i]; i++) {
            placesListInnerHTML += '<li id=\"tr_' + place.place_id + '\"></li>';
        }

        placesList.innerHTML=placesListInnerHTML;

        var liInnerHtml;
        for (var i = 0, place; place = results[i]; i++) {
            liInnerHtml='';

            liInnerHtml+='<li style=\"border: 5px solid black\">';

            var photos = place.photos;
            if (photos) {
                liInnerHtml+=
                    '<div id="imgleft"><img src=\"' + photos[0].getUrl({
                    'maxWidth': 178,
                    'maxHeight': 128
                }) + '\" alt=\"\" class=\"left\" /></div>';
            }else {
                 liInnerHtml+=
                    '<div id="imgleft"><img src=\"\" alt=\"\" class=\"left\" /></div>';
            }

            liInnerHtml+='<h3>' + place.name + '</h3>';
            liInnerHtml+='<p>' + place.name + '<p>';
            liInnerHtml+='</li>';

            document.getElementById('tr_' + place.place_id).innerHTML = liInnerHtml;
        }

        console.log(placesList.innerHTML);
    }
}


google.maps.event.addDomListener(window, 'load', initialize);
