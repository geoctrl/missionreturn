mrApp.config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/app/home/home.html',
            controller: 'homeCtrl',
            params: {flashMessage: {
                title: null,
                content: null
            }}
        })
})

    .controller('homeCtrl', function($scope, UserService) {
        
        $scope.createUser = function() {
            UserService.createUser('tonylefler@gmail.com', '12345678');
        }
    });