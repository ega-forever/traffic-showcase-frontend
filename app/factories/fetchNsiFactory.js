/**
 *@factory nsi - store actions to fetch nsi
 */
angular.module('nsiFactory', [])
  .factory('nsiFetchService', function ($http) {


    var builder = function (params, route) {
      var deferred = Q.defer();
       $http({
        method: 'GET',
        url: 'http://localhost:9000/nsi/' + route,
        params: params
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      }, function errorCallback(response) {});

      return deferred.promise;
    };


    return {
      bus: function (params) {
        return builder(params, 'bus')
      }
    }

  });