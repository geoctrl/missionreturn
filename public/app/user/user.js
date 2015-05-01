mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl'
            })
    })

    .controller('userCtrl', function($scope, UserService, TokenService, $state, tlNotifyService) {
        var count = 0;
        $scope.notify = function() {
            count++;
            tlNotifyService.notify('sample-342345-s33423', {
                title: 'Sample Completed',
                link: 'Sample 342345-s33423',
                duration: 0
            });
        }
    }); 