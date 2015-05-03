mrApp.config(function($stateProvider) {
    $stateProvider
        .state('authorize', {
            url: '/authorize',
            templateUrl: '/app/authorize/authorize.html'
        })
        .state('authorizeToken', {
            url: '/authorize/:authToken',
            controller: 'authorizeTokenCtrl'
        })
})

    .controller('authorizeTokenCtrl', function($scope, $state, UserService) {
        var promise = UserService.authorizeUser($state.params.authToken);
        promise.then(function(data) {
            console.log(data);
            if (data.error) {
                $state.go('login', {flashMessage: 'Error: '+data.error})
            } else {
                $state.go('user', {flashMessage: 'Your account is now activated'})
            }
        })
    });