//Initialize Foundation
$(document).foundation();

/**
 * Global variables that are used throughout the whole application are defined here
 */

var markers = [];
var map;

/**
 * Hard Coded Locations to be shown on the google map. Category is used for FourSquare API,
 * to find similar categories next to the location.
 * @type {[*]}
 */
var markerPlaces = [
    {name: "Saint Nicholas", category: 'Church', lat: 38.021327, lng: 23.798533},
    {name: "Details", category: 'Cafe',lat: 38.020848, lng: 23.798863},
    {name: "Theory", category: 'Bar', lat: 38.021443, lng: 23.799763},
    {name: "Sake Tattoo Crew", category: 'Tattoo', lat: 38.022828, lng: 23.799051},
    {name: "Papadaki Anna", category: 'Pharmacy',lat: 38.023482, lng: 23.798078}
];

/**
 * Location Model for KnockoutJS to create a Location
 * @param data
 * @constructor
 */
var Location = function (data) {
    this.name = data.name;
    this.category = data.category;
    this.lat = data.lat;
    this.lng = data.lng;
};

/**
 * Knockout JS View Model is defined here
 * @constructor
 */
var ViewModel = function() {

    var self = this;

    //create an observableArray to store the locations
    self.locationList = ko.observableArray ("");

    //Create a location model for each place, and store it in the observable array
    markerPlaces.forEach(function(place){
        self.locationList.push(new Location(place));
    });

    /* This section is binded to the list of places on the off canvas menu.
    When the user clicks on title, the object is compared to the list of markers.
    If the object exists in the list of markers, it triggers a click even for that marker to display to the user.
     */
    self.selectMarker = function(){
        selectedMarker = this;
        markers.forEach(function(value,i){
            //If the selected value is found in the marker list, trigger a click event to display it
           if(selectedMarker.name == value.title){
               google.maps.event.trigger(markers[i], 'click');
           }
        });

        /*hide the off canvas when a location is selected */
        $('#offCanvas').foundation('close');
    };

    /*This section is used to filter the search results. A ko observable is binded to the
    input field to get the data as the user inputs it (by default the field is left blank)
     */
    this.query = ko.observable("");

    /*ko.computed is used to filter the list.
    The query value (letters the user types) is obtained as the user inputs it, and is converted to a lower
    case to make sure the query isn't case sensitive. If the filter is not defined (falsey), the full locationList is displayed.

    when the user starts to type, using ko.utils.arrayFilter, each item is compared to see if what the user is typing
    matches the locationList defined and if it does, it displays the filtered list.

    idea to use ko.computer was taken from: https://stackoverflow.com/questions/32343306/live-table-search-in-knockout-calling-function-on-keyup
    with "karl anderson's" response and modified to include markers being filtered as the user types
     */
    self.filteredLocation = ko.computed(function(){

        var filter = self.query().toLowerCase();

        /*if the input field is falsey (empty), show all the locations, and return the full locationList with all
        markers */
        if(!filter) {
            showListings();
            return self.locationList();

        } else {
        /* if the user starts typing, All markers are set to hidden, the user's search field is compared to the locationList
        that has all the locations, and only the ones that match are returned.
         */
        hideListings();
        var searchResult = ko.utils.arrayFilter(self.locationList(), function(item){
            return item.name.toLowerCase().indexOf(filter) !== -1;
        });

        // after the matches are returned, for each hit, iterate through the markers list and display them if they exit
        searchResult.forEach(function(loc){
            markers.forEach(function(marker){
              if(loc.name === marker.title){
                  marker.setVisible(true);
              }
            });
        });

        //return the searchResult to be displayed in the list
        return searchResult;
        }
    });

    /*Used to re-center incase the user wanders off the markers locations */
    self.recenter = function(){
        map.panTo({lat: 38.022098, lng: 23.799123});
    };

};
// binding for ViewModel
ko.applyBindings(new ViewModel());


/**
 * Google MAPS API initialization
 */
function initMap() {

    //Initialize map with center and zoom
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.022098, lng: 23.799123},
        zoom: 17,
        //Blue Water style by Xavier Foucrier: https://snazzymaps.com/style/25/blue-water
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
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
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });

    var largeInfowindow = new google.maps.InfoWindow();

    /*This section iterates over all the places defined in the markerPlaces array and creates both a marker, and an
    event listener for the marker*/
    markerPlaces.forEach(function(location){
        var position = location;
        var title = location.name;
        var category = location.category;

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            category: category
        });
        //pushes the marker in a markers array
        markers.push(marker);
        //on click event listener. Changes map center to marker position and populates the infowindow
        marker.addListener('click', function(){
            map.panTo(this.position);
            populateInfoWindow(this, largeInfowindow);
        });

    });

    //Info window is called when marker is clicked. Populates the information on the infowindow based on position.
    function populateInfoWindow(marker, infowindow) {

        /*Animate the application to bounce once. This was done by implementing the bounce animation on the marker,
        and as the bounce animation only stops once the marker.setAnimation is set to null, a setTimeout was set for
        750ms to display one bounce only.

        I thought of the timeout idea after reading google maps docs, but the time it takes for one bounce was found
        from the following SO article:
        https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
        */
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);

        //check to make sure the marker isn't open already.
        if (infowindow.marker != marker) {
            infowindow.setContent('<img src="img/loading_spinner.gif" alt="Spinner" style="width=20px;">');
            infowindow.marker = marker;

        }
        //Clear marker property when infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });

        /**
         * This section uses FourSquare's API in order to obtain information about relevenate places next to the marker
         * with the same category.
         *
         * If the request succeeds, it displays the first 3 responses from the api call. if the APi call fails,
         * it retrieves an error message.
         */
        function similarPlaces() {

            //FourSquare Variables
            var client_id = '&client_id=DCRLHUKYQIOYFPNHLG1K3CTND44TPVQDNLJCOE3OZLF13KJ2';
            var client_secret = '&client_secret=PUZCQDPDZSDE1D1UKVETBEXULG2NVKJFRAJM4DFQGXE1FGKI';
            var date = "&v=20170606";
            var category = "&query=" + marker.category;
            var searchUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + "38.022098,23.799123";
            var url = searchUrl + client_id + client_secret + date + category;

            $.ajax({
                url: url,
                success: function (results) {

                    var similarPlaces = "";
                    for(var i = 0; i < 3; i++){
                        similarPlaces += '<li>' + results.response.venues[i].name + '</li>';
                    }
                    infowindow.setContent(  '<h5>' + marker.title + ' - ' + marker.category + '</h5>' +
                                            '<h6> Similar Shops </h6>' +
                                            '<ol class="no-bullet similar-locations">' + similarPlaces + '</ol>'+
                                            '<p class="foursquare-des"><i>*This is a list of similar shops around the neighborhood using FourSquare. Feel free to google the place fore more info </i></p>'
                                            );
                },
                error: function (error) {
                    infowindow.setContent('<h5>' + marker.title + '</h5>' + '<p>There was an issue connecting to FourSquare, please try again later</p>');
                }
            });
        }
        similarPlaces();
        infowindow.open(map, marker);
    }
}

/**
 * Function hides all the markers when called./
 */
function hideListings() {
    markers.forEach(function(place){
        place.setVisible(false);
    });
}

/**
 * Function shows all the markers when called./
 */
function showListings() {
    markers.forEach(function(place){
        place.setVisible(true);
    });
}

function googleError() {
    alert("Google Maps failed to load, please try again later. If this Error keeps apearing, pleas contact your local admin");
}

