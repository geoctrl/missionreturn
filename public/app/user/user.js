mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl',
                params: {
                    flashMessage: {
                        title: null,
                        content: null
                    }
                }
            })
    })

    .controller('userCtrl', function($scope, UserService, TokenService, $state, tlNotifyService) {


        $scope.logoutUser = function() {
            UserService.logoutUser();
        }
    }); 