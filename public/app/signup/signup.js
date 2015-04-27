mrApp.config(function($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '/app/signup/signup.html',
            controller: 'signupCtrl'
        })
})

    .controller('signupCtrl', function($scope, UserService, $state) {

        $scope.userSignup = function() {
            if (!$scope.signupForm.$invalid) {
                UserService.createUser().then(function(data) {
                    $scope.userError = data.error;
                });
            } else {
                $scope.signupForm.email.$pristine = false;
                $scope.signupForm.password.$pristine = false;
            }
        };
    });