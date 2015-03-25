mrApp.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user/:username',
                templateUrl: '/app/user/user.html',
                controller: 'userCtrl'
            })
    })

    .controller('userCtrl', function($scope, Restangular) {

        Restangular.one('people').get().then(function(data) {
            console.log(data);
        });

        console.log('user controller')
    });