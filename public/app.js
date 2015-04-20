var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt',
    'LocalStorageModule'
])

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider, TokenProvider) {

        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('http://localhost:5556/api/')
            .setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
                headers.token = TokenProvider.$get().token;

                return {
                    element: element,
                    params: params,
                    headers: headers,
                    httpConfig: httpConfig
                };
            });
        $urlRouterProvider.otherwise('/');

    })

    .controller('MainCtrl', function($scope, Restangular) {

    });