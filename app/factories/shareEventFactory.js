/**
 *@factory to handle map touch event
 */
angular.module('eventFactory', [])
    .factory('shareEventService', function ($rootScope) {

        var scope = $rootScope;

        return {
            getMapUpdateEvent: function (s) {
                return scope.$on('ev', s)
            },
            triggerMapUpdateEvent: function (latLngTemp) {
                scope.$emit('ev', latLngTemp);
            }
        };
    });