var mrApp = angular.module('missionReturnApp', [
    'restangular',
    'ui.router',
    'angular-jwt',
    'LocalStorageModule',
    'tl.toaster-notify'
])

    .constant('appConstants', {
        primaryColor: '#F64747',
        secondaryColor: '#ffd95e',
        logOut: 'user-logged-in',
        logIn: 'user-log-out',
        skipAuth: ['signup', 'login', 'authorize', 'forgotPassword']
    })
    
    .constant('errorConstants', {
        generateTokenFalse: 'Server was unable to generate a token. Please Contact an admin for support.'
    })

    .config(function(RestangularProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/journal');
        RestangularProvider.setBaseUrl('http://localhost:5556/api/');
    })
    
    .run(function($rootScope, $state, UserService, appConstants, $timeout, tlNotifyService) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if (appConstants.skipAuth.indexOf(toState.name) == -1) {
                if (!UserService.isAuthenticated()) {
                    $timeout(function() {
                        $state.go('login' );
                    })
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(e) {
            if (!_.isNull($state.params.flashMessage.content)) {
                tlNotifyService.notify($state.params.flashMessage.content, {
                    title: $state.params.flashMessage.title
                });
            }
        });
    });