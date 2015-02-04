// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
var placeSearchService, autocomplete, placesList;
//var componentForm = {
//  street_number: 'short_name',
//  route: 'long_name',
//  locality: 'long_name',
//  administrative_area_level_1: 'short_name',
//  country: 'long_name',
//  postal_code: 'short_name'
//};

function initialize() {
    console.info("initialize");
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById('ba_where')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        console.log(autocomplete.getPlace());
        //        debug();
    });

    placesList = document.getElementById('places');
}

function debug() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();


//    alert(autocomplete.getPlace().geometry.location.lat());
//    alert(autocomplete.getPlace().geometry.location.lng());
//    alert(autocomplete.getPlace().name);

    //  for (var component in componentForm) {
    //    document.getElementById(component).value = '';
    //    document.getElementById(component).disabled = false;
    //  }
    //
    //  // Get each component of the address from the place details
    //  // and fill the corresponding field on the form.
    //  for (var i = 0; i < place.address_components.length; i++) {
    //    var addressType = place.address_components[i].types[0];
    //    if (componentForm[addressType]) {
    //      var val = place.address_components[i][componentForm[addressType]];
    //      document.getElementById(addressType).value = val;
    //    }
    //  }
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
//    alert('request : ' + request.keyword + ' | ' + request.location + ' | ' + request.radius + ' | ' + request.types);
    // send request
    placeSearchService = new google.maps.places.PlacesService(placesList);
    placeSearchService.search(request, callback);
}

//https://developers.google.com/maps/documentation/javascript/examples/place-search-pagination
//http://stackoverflow.com/questions/14343965/google-places-library-without-map

function callback(results, status, pagination) {
//    alert("STATUS|" + status + "|");
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
//        <tr>
//												<td>Something</td>
//												<td>Ante turpis integer aliquet porttitor.</td>
//												<td>29.99</td>
//											</tr>
        var detailsRequest ={
            placeId: ''
        };
        var placesListInnerHTML='<table><tbody>';
        for (var i = 0, place; place = results[i]; i++) {

            placesListInnerHTML += '<tr>';
//            placesListInnerHTML += '<td>' + JSON.stringify(place); + '</td>';
////            placesListInnerHTML += '<td>' + place.name + '</td>';
////            placesListInnerHTML += '<td>' + place.website + '</td>';
////            placesListInnerHTML += '<td>' + place.rating + '</td>';
//            placesListInnerHTML += '</tr>';
            console.log(results[i].id);
            detailsRequest.placeId=results[i].place_id;
            console.log(detailsRequest);


            placeSearchService.getDetails(detailsRequest, function (placeDetails, status1) {
             if (status1 == google.maps.places.PlacesServiceStatus.OK) {
                 console.log('TA DAH');
                 placesListInnerHTML += '<td>' + JSON.stringify(placeDetails); + '</td>';
             }
            });

            placesListInnerHTML += '</tr>';

        }
        placesListInnerHTML+='</table></tbody>';
        console.info(placesListInnerHTML);
//        alert(placesListInnerHTML);
        placesList.innerHTML=placesListInnerHTML;

        //    createMarkers(results);
        //
        //    if (pagination.hasNextPage) {
        //      var moreButton = document.getElementById('more');
        //
        //      moreButton.disabled = false;
        //
        //      google.maps.event.addDomListenerOnce(moreButton, 'click',
        //          function() {
        //        moreButton.disabled = true;
        //        pagination.nextPage();
        //      });
        //    }
    }
}


google.maps.event.addDomListener(window, 'load', initialize);
