mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl'
            })
    })

    .controller('userCtrl', function($scope, UserService, TokenService, $state) {
        
    });