var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router'
])

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider) {
        RestangularProvider.setBaseUrl('/api/');

        $urlRouterProvider.otherwise('/');
        
    })

    .controller('MainCtrl', function($scope, Restangular) {

    });