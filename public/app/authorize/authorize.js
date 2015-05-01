mrApp.config(function($stateProvider) {
    $stateProvider
        .state('authorize', {
            url: '/authorize/:authToken',
            controller: 'authorizeCtrl'
        })
})

    .controller('authorizeCtrl', function($scope, $state, UserService) {
        UserService.authorizeUser($state.params.authToken);
    });