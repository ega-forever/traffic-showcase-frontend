/**
 *@controller maps - google maps controller
 * @inject shareEventService to handle map touch event through factory's scope
 */
angular.module('maps', [])
  .controller('mapCtrl', function (shareEventService, nsiFetchService, $scope) {
    var _this = this;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var service = new google.maps.DistanceMatrixService();


    nsiFetchService.bus({}).then(function (buses) {
      _this.buses = buses;
      $scope.$apply();
    });

    _this.setBus = function (id) {
      (_this.params || (_this.params = {})).busId = id;
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 55, lng: 55},
      zoom: 12,
      mapTypeControl: false
    });


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        _this.myPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(_this.myPos);
      }, function () {
      });
    } else {
      alert('no geolocation support');
    }


    map.addListener('click', function (e) {

      directionsDisplay.setMap(null);

      Q.fcall(function () {
          var deferred = Q.defer();
          service.getDistanceMatrix(
            {
              origins: [_this.myPos],
              destinations: [{lat: e.latLng.lat(), lng: e.latLng.lng()}],
              travelMode: google.maps.TravelMode.DRIVING,
              drivingOptions: {
                departureTime: new Date(Date.now() + 1),  // for the time N milliseconds from now.
                trafficModel: "optimistic"
              }
            }, deferred.resolve);
          return deferred.promise;
        })
        .then(function (dataTime) {
          var deferred = Q.defer();
          directionsDisplay.setMap(map);
          directionsService.route({
            origin: _this.myPos,
            destination: {lat: e.latLng.lat(), lng: e.latLng.lng()},
            travelMode: google.maps.TravelMode.DRIVING
          }, function (response) {
            return deferred.resolve({dataTime: dataTime, buildRoute: response})
          });
          return deferred.promise;
        }).then(function (obj) {
        if (obj.buildRoute.status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(obj.buildRoute);
        } else {
          window.alert('Directions request failed due to ' + status);
        }

        return Q.fcall(function () {
          return obj
        })
      }).then(function (obj) {
        shareEventService.triggerMapUpdateEvent(_.merge(obj, {params: _this.params}));
      })

    });

  });
