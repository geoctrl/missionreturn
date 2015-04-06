var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt'
])

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('/api/')
            

            .addFullRequestInterceptor(function(headers, params, element, httpConfig) {
                console.log(headers, params, element, httpConfig);
            })

        $urlRouterProvider.otherwise('/');
        
    })

    .controller('MainCtrl', function($scope, Restangular) {

    });