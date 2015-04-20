mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user/:username',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl'
            })
    })

    .controller('userCtrl', function($scope, UserService, Token) {
        
        $scope.user = UserService.getUser();
        
        
        $scope.createUser = function() {
            UserService.createUser();
        }
        
    });