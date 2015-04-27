mrApp.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/login/login.html',
            controller: 'loginCtrl'
        })
})

    .controller('loginCtrl', function($scope, UserService) {
        
        $scope.loginUser = function() {
            if (!$scope.loginForm.$invalid) {
                UserService.loginUser(
                    $scope.user.email,
                    $scope.user.password
                ).then(function(data) {
                    $scope.userError = data.error;
                });
            } else {
                $scope.loginForm.email.$pristine = false;
                $scope.loginForm.password.$pristine = false;
            }
        }
        
    });