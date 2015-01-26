var input_gmap_where = document.getElementById('gmap_where');                 // HTML element
var msg = 'Sorry, we were unable to get your location.';    // No location msg

if (Modernizr.geolocation) {                                // Is geo supported
  navigator.geolocation.getCurrentPosition(success, fail);  // Ask for location
//  input_gmap_where.value = 'Checking location...';               // Say checking...
} else {                                                    // Not supported
  input_gmap_where.value = msg;                                  // Add manual entry
}

function success(location) {                                  // Got location
//  msg = '<h3>Longitude:<br>';                               // Create message
  msg='';
  msg += location.coords.longitude ;//+ '</h3>';               // Add longitude
//  msg += '<h3>Latitude:<br>';                               // Create message
  msg += ', '
  msg += location.coords.latitude ;//+ '</h3>';                // Add latitude
  input_gmap_where.value = msg;                             // Show location
}

function fail(msg) {                                        // Not got location
  input_gmap_where.textContent = msg;                                  // Show text input
  console.log(msg.code);                                    // Log the error
}
