var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt',
    'LocalStorageModule',
    'tl.toaster-notify'
])

    .constant('appConstants', {
        logOut: 'user-logged-in',
        logIn: 'user-log-out',
        skipAuth: ['signup', 'login', 'authorize']
    })
    
    .constant('errorConstants', {
        generateTokenFalse: 'Server was unable to generate a token. Please Contact an admin for support.'
    })

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('http://localhost:5556/api/');
    })
    
    .run(function($rootScope, $state, UserService, appConstants, $timeout) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if (appConstants.skipAuth.indexOf(toState.name) == -1) {
                if (!UserService.isAuthenticated()) {
                    $timeout(function() {
                        $state.go('login');
                    })
                }
            }
        })
    });