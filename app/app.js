/**
 * @callback when angular is loaded
 * @inject - info, maps, eventFactory, nsiFactory modules
 */
(function(angular) {
    angular.module('app', ['maps', 'info', 'eventFactory', 'nsiFactory'])
      .constant('_', window._)
      .run(function ($rootScope) {
          $rootScope._ = window._;
      });
})(angular);