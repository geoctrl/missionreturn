mrApp.config(function($stateProvider) {
    $stateProvider
        .state('authorizeToken', {
            url: '/authorize/:authToken',
            controller: 'authorizeTokenCtrl',
            params: {
                flashMessage: {
                    title: null,
                    content: null
                }
            }
        })
})

    .controller('authorizeTokenCtrl', function($scope, $state, UserService) {
        var promise = UserService.authorizeUser($state.params.authToken);
        promise.then(function(data) {
            console.log(data);
            if (data.error) {
                $state.go('login', {
                    flashMessage: {
                        title: 'Error',
                        content: 'data.error'
                    }
                })
            } else {
                $state.go('login', {
                    flashMessage: {
                        title: 'Success',
                        content: 'Your account is now activated'
                    }
                })
            }
        })
    });