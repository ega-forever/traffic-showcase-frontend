/**
 * @callback when angular is loaded
 */
(function(angular) {
    angular.module('app', ['maps', 'info', 'eventFactory', 'nsiFactory'])
      .constant('_', window._)
      .run(function ($rootScope) {
          $rootScope._ = window._;
      });
})(angular);