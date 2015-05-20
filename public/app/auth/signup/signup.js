mrApp.config(function($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '/app/auth/signup/signup.html',
            controller: 'signupCtrl',
            params: {
                flashMessage: {
                    title: null,
                    content: null
                }
            }
        })
})

    .controller('signupCtrl', function($scope, UserService, $state, tlNotifyService) {

        $scope.userSignup = function() {
            $scope.userError = false;
            if (!$scope.signupForm.$invalid) {
                UserService.createUser(
                    $scope.user.email,
                    $scope.user.password
                ).then(function(data) {
                        if (data.error) {
                            tlNotifyService.notify(data.error, {
                                title: 'Error'
                            });
                        } else {
                            $scope.signUpSuccess = true;
                        }
                });
            } else {
                $scope.signupForm.email.$pristine = false;
                $scope.signupForm.password.$pristine = false;
            }
        };
    });