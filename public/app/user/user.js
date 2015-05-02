mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl',
                params: {flashMessage: null}
            })
    })

    .controller('userCtrl', function($scope, UserService, TokenService, $state, tlNotifyService) {
        tlNotifyService.notify($state.params.flashMessage);

        var count = 0;
        $scope.notify = function() {
            count++;
            tlNotifyService.notify('sample-342345-s33423');
        }
    }); 