/**
 * @test jasmine unit
 * checking for request
 */
describe('Controller: public/controllers/infoListCtrl', function () {

    var data = null;
    var $http = angular.injector(["ng"]).get("$http");


    beforeEach(function (done) {

        $http({
            method: 'GET',
            url: 'http://localhost:9000/calculate',
            params: {distance: 1, busId: 1}
        }).then(function successCallback(response) {
            data = response.data;
            done();
        }, function errorCallback(response) {
            console.log(response);
            done();
        });

    });


    it('fetch data', function () {
        expect(Array.isArray(data)).toBe(true);
    });



});