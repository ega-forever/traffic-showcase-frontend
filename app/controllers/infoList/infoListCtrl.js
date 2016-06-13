/**
 *@controller infoList - display info about route distance,
 * bus credentials and total income
 *@inject shareEventService to handle map touch event through factory's scope
 */
angular.module('info', [])
  .controller('infoListCtrl', function ($http, shareEventService) {

    var _this = this;

    shareEventService.getMapUpdateEvent(function (ev, obj) {

      console.log(_.get(obj, 'dataTime.rows', []));

      $http({
        method: 'GET',
        url: 'http://localhost:9000/calculate',
        params: {
          distance: _.chain(obj)
            .get('dataTime.rows', []).head()
            .get('elements', []).head()
            .get('distance')
            .result('value').divide(1000).value(),
          busId: _.get(obj, "params.busId")

        }
      }).then(function successCallback(response) {
        _this.data = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    })

  });
