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
        
    });