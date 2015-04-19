var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt',
    'LocalStorageModule'
])

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider, TokenService) {
        
        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('http://localhost:5556/api/')
            .setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
                if (TokenService.getToken()) {
                    headers.token = TokenService.getToken();
                    return {
                        element: element,
                        params: params,
                        headers: headers,
                        httpConfig: httpConfig
                    };
                } else {
                    
                }
            });
        $urlRouterProvider.otherwise('/');
        
    })

    .controller('MainCtrl', function($scope, Restangular) {

    });