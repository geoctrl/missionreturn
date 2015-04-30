mrApp.config(function($stateProvider) {
    $stateProvider
        .state('authorize', {
            url: '/authorize/:authToken',
            controller: 'authorizeCtrl'
        })
})

    .controller('authorizeCtrl', function($scope, $state, UserService) {
        var promise = UserService.authorizeUser($state.params.authToken);
        
        promise.then(function(data) {
            console.log('promise works')
        });
    });