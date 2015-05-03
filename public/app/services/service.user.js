mrApp.service('UserService', function(
    Restangular, TokenService, appConstants, $state, $q, localStorageService, jwtHelper, TokenRestangular, errorConstants) {

    return {
        
        getUser: function() {
            return TokenRestangular.one('people').get();
        },
        
        createUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('people').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    resolve(data);

                });
            });
        },
        
        loginUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('login').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    if (!data.error) {
                        TokenService.setToken(data.token);
                    }
                    resolve(data);
                })
            })
        },
        
        authorizeUser: function(authToken) {
            return $q(function(resolve, reject) {
                Restangular.all('authorize').post('params', {
                    authToken: authToken
                }).then(function(data) {
                    if (!data.error) {
                        TokenService.setToken(data.token);
                    }
                    resolve(data);
                });
            })
        },
        
        isAuthenticated: function() {
            if (TokenService.getToken()) {
                if (jwtHelper.isTokenExpired(TokenService.getToken())) {
                    TokenService.deleteToken();
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

    }
});