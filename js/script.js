var geocoder;
var map;
var markers = Array();
var infos = Array();

//function initialize() {
//    // prepare Geocoder
//    geocoder = new google.maps.Geocoder();
//
//    // set initial position (New York)
//    var myLatlng = new google.maps.LatLng(51.5147643,-0.137734);
//
//    var myOptions = { // default map options
//        zoom: 14,
//        center: myLatlng,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
//}
//
//// clear overlays function
//function clearOverlays() {
//    if (markers) {
//        for (i in markers) {
//            markers[i].setMap(null);
//        }
//        markers = [];
//        infos = [];
//    }
//}
//
//// clear infos function
//function clearInfos() {
//    if (infos) {
//        for (i in infos) {
//            if (infos[i].getMap()) {
//                infos[i].close();
//            }
//        }
//    }
//}
//
//// find address function
//function findAddress() {
//    alert("hello findAddress");
//	var address = document.getElementById("gmap_where").value;
//
//    // script uses our 'geocoder' in order to find location by address name
//    geocoder.geocode( { 'address': address}, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok
//
//            // we will center map
//            var addrLocation = results[0].geometry.location;
//            map.setCenter(addrLocation);
//
//            // store current coordinates into hidden variables
//            document.getElementById('lat').value = results[0].geometry.location.Xa;
//            document.getElementById('lng').value = results[0].geometry.location.Ya;
//
//            // and then - add new custom marker
//            var addrMarker = new google.maps.Marker({
//                position: addrLocation,
//                map: map,
//                title: results[0].formatted_address,
//                icon: 'marker.png'
//            });
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
//}
//
//// find custom places function
//function findPlaces() {
////	alert("hello findPlaces");
//    // prepare variables (filter)
//    var type = "store";//document.getElementById('gmap_type').value;
//    var radius = 5000;//document.getElementById('gmap_radius').value;
//    var keyword = document.getElementById('gmap_keyword').value; //I'm looking for...
//    var lat = document.getElementById('lat').value;
//    var lng = document.getElementById('lng').value;
//    var cur_location = new google.maps.LatLng(lat, lng);
//
//    // prepare request to Places
//    var request = {
//        location: cur_location,
//        radius: radius,
//        types: [type]
//    };
//
//    if (keyword) {
//        request.keyword = [keyword];
//    }
//    alert('request : ' + request.keyword + ' | '+ request.location + ' | ' + request.radius + ' | ' + request.types);
//    // send request
//    service = new google.maps.places.PlacesService(map);
//    service.search(request, createMarkers);
//}
//
//// create markers (from 'findPlaces' function)
//function createMarkers(results, status) {
//    if (status == google.maps.places.PlacesServiceStatus.OK) {
//
//        // if we have found something - clear map (overlays)
//        clearOverlays();
//
//        // and create new markers by search result
//        for (var i = 0; i < results.length; i++) {
//            createMarker(results[i]);
//        }
//    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
//        alert('Sorry, nothing is found');
//    }
//}
//
//// creare single marker function
//function createMarker(obj) {
//
//    // prepare new Marker object
//    var mark = new google.maps.Marker({
//        position: obj.geometry.location,
//        map: map,
//        title: obj.name
//    });
//    markers.push(mark);
//
//    // prepare info window
//    var infowindow = new google.maps.InfoWindow({
//        content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name +
//        '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
//    });
//
//    // add event handler to current marker
//    google.maps.event.addListener(mark, 'click', function() {
//        clearInfos();
//        infowindow.open(map,mark);
//    });
//    infos.push(infowindow);
//}
//
//// initialization
//google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  var map = new google.maps.Map(document.getElementById('gmap_canvas'), {
    center: new google.maps.LatLng(51.5154187,-0.1411794),
    zoom: 15
  });

  var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  };

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
