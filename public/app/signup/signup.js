mrApp.config(function($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '/app/signup/signup.html',
            controller: 'signupCtrl'
        })
})

    .controller('signupCtrl', function($scope, UserService) {

        $scope.userSignup = function() {
            if (!$scope.signupForm.$invalid) {
                UserService.createUser($scope.user.email, $scope.user.password);
            } else {
                $scope.signupForm.email.$pristine = false;
                $scope.signupForm.password.$pristine = false;
            }
        }
    });