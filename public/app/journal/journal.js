mrApp.config(function($stateProvider) {
        $stateProvider
            .state('journal', {
                url: '/journal',
                templateUrl: '/app/journal/journal.html',
                controller: 'journalCtrl',
                params: {
                    flashMessage: {
                        title: null,
                        content: null
                    }
                }
            })
    })

    .controller('journalCtrl', function($scope, UserService, TokenService, $state, tlNotifyService) {


        $scope.logoutUser = function() {
            UserService.logoutUser();
        }
    }); 