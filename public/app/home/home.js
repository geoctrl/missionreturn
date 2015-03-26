mrApp.config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/app/home/home.html',
            controller: 'homeCtrl'
        })
})

    .controller('homeCtrl', function($scope, Restangular) {
        
    });