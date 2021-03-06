mrApp.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/auth/login/login.html',
            controller: 'loginCtrl',
            params: {flashMessage: {
                title: null,
                content: null
            }}
        })
})

    .controller('loginCtrl', function($scope, UserService, $state, tlNotifyService) {

        $scope.loginUser = function() {
            if (!$scope.loginForm.$invalid) {
                UserService.loginUser(
                    $scope.user.email,
                    $scope.user.password
                ).then(function(data) {
                        if (data.error) {
                            tlNotifyService.notify(data.error, {
                                title: 'Error'
                            });
                        } else {
                            $state.go('journal', {
                                flashMessage: {
                                    content: 'Logged in Successfully'
                                }
                            })
                        }
                    });
            } else {
                $scope.loginForm.email.$pristine = false;
                $scope.loginForm.password.$pristine = false;
            }
        }

    });