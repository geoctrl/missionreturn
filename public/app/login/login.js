mrApp.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/login/login.html',
            controller: 'loginCtrl'
        })
})

    .controller('loginCtrl', function($scope, UserService) {

    });