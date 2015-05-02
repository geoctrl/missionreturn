mrApp.config(function($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '/app/signup/signup.html',
            controller: 'signupCtrl',
            params: {flashMessage: null}
        })
})

    .controller('signupCtrl', function($scope, UserService, $state, tlNotifyService) {
        tlNotifyService.notify($state.params.flashMessage);

        $scope.userSignup = function() {
            $scope.userError = false;
            if (!$scope.signupForm.$invalid) {
                UserService.createUser(
                    $scope.user.email,
                    $scope.user.password
                ).then(function(data) {
                    $scope.userError = data.error;
                });
            } else {
                $scope.signupForm.email.$pristine = false;
                $scope.signupForm.password.$pristine = false;
            }
        };
    });