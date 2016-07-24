(function() {
    'use strict';

    angular
        .module('testApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        // MAP
        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'pelewin.0n618hc9',
            accessToken: 'pk.eyJ1IjoicGVsZXdpbiIsImEiOiJjaXF1MGs0dTYwMDlkZndudGc4bHk1aGlxIn0.awdybHhZmOfGzJhZArZYtg'
        }).addTo(mymap);

        var marker = L.marker([51.5, -0.09]).addTo(mymap);

        var circle = L.circle([51.508, -0.11], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap);

        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(mymap);

        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        circle.bindPopup("I am a circle.");
        polygon.bindPopup("I am a polygon.");

        var popup = L.popup()
            .setLatLng([51.5, -0.09])
            .setContent("I am a standalone popup.")
            .openOn(mymap);

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mymap);
        }

        mymap.on('click', onMapClick);


        // END MAP


        //GOOGLE MAP
        function initMap() {
            var auckland = {lat: -42.86, lng: 174.82};
            var indianapolis = {lat: 39.79, lng: -86.14};

            var map = new google.maps.Map(document.getElementById('map'), {
                center: auckland,
                scrollwheel: false,
                zoom: 4
            });

            var markers = [];
            loadTracks(map, markers);

            var options = {
                imagePath: 'content/images/m'
            };

            //var markerCluster = new MarkerClusterer(map, markers, options);


            /*var i = new google.maps.Marker({
                position: new google.maps.LatLng(-43.214362, 170.798802),
                map: map,
                title: "dfdfd"
                //,
                //icon: getIconURL(e.category)
            });*/
            /*addTrackMarker({
                category: "Tramping Track",
                id: 1821,
                lat: -43.214362,
                length: 8110.23150522782,
                lng: 170.798802,
                name: "Wanganui Cableway To Smyth Hut",
                to_param: "1821-wanganui-cableway-to-smyth-hut"
            });*/

            //initMap();
            /*var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            // Set destination, origin and travel mode.
            var request = {
                destination: indianapolis,
                origin: chicago,
                travelMode: google.maps.TravelMode.DRIVING
            };
            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);
                }
            });*/
        }
        initMap();
        //END GOOGLE MAP

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
