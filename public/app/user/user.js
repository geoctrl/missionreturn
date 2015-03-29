mrApp.config(function($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user/:username',
            templateUrl: '/app/user/user.html',
            controller: 'userCtrl'
        })
})

    .controller('userCtrl', function($scope, UserService) {

        $scope.user = UserService.getUser('john-doe');

    });