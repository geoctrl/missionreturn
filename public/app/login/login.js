mrApp.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/login/login.html',
            controller: 'loginCtrl',
            params: {flashMessage: {
                title: null,
                content: null
            }}
        })
})

    .controller('loginCtrl', function($scope, UserService, $state, tlNotifyService) {
        tlNotifyService.notify($state.params.flashMessage.content, {
            title: $state.params.flashMessage.title
        });

        $scope.loginUser = function() {
            if (!$scope.loginForm.$invalid) {
                UserService.loginUser(
                    $scope.user.email,
                    $scope.user.password
                ).then(function(data) {
                        if (data.error) {
                            tlNotifyService.notify(data.error, {title: 'Error'});
                        } else {
                            $state.go('user', {flashMessage: {title: 'success', content: 'Logged in Successfully'}})
                        }
                    });
            } else {
                $scope.loginForm.email.$pristine = false;
                $scope.loginForm.password.$pristine = false;
            }
        }

    });