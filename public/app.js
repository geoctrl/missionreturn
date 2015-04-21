var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt',
    'LocalStorageModule'
])

    .constant('appConstants', {
        token: 'token'
    })

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('http://localhost:5556/api/');

    })
    
    .run(function($rootScope, $state, localStorageService, TokenService, appConstants) {
        
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            console.log(TokenService.getToken());
        })
    })

    .controller('MainCtrl', function($scope, Restangular) {
    });