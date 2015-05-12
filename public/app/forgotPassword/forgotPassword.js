mrApp.config(function($stateProvider) {
    $stateProvider
        .state('forgotPassword', {
            url: '/reset-password',
            templateUrl: '/app/forgotPassword/forgotPassword.html',
            controller: 'forgotPasswordCtrl',
            params: {flashMessage: {
                title: null,
                content: null
            }}
        })
})

    .controller('forgotPasswordCtrl', function($scope) {
        $scope.resetPassword = function() {
            if (!$scope.loginForm.$invalid) {

            } else {
                $scope.loginForm.email.$pristine = false;
            }
        }
    });

