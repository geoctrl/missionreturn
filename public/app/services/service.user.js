mrApp.service('UserService', function(
    Restangular, TokenService, appConstants, $state, $q, localStorageService, jwtHelper, TokenRestangular, errorConstants) {

    return {
        
        getUser: function() {
            return TokenRestangular.one('people').get().$object;
        },
        
        createUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('people').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    if (data.error) {
                        resolve(data);
                    } else {
                        if (data.token) {
                            TokenService.setToken(data.token);
                            $state.go('user');
                        } else {
                            return {error: errorConstants.generateTokenFalse};
                        }
                    }
                });
            });
        },
        
        loginUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('user/login').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    if (data.error) {
                        resolve(data);
                    } else {
                        if (data.token) {
                            TokenService.setToken(data.token);
                            $state.go('user');
                        } else {
                            return {error: errorConstants.generateTokenFalse};
                        }
                    }
                })
            })
        },
        
        authorizeUser: function(authToken) {
            return $q(function(resolve, reject) {
                Restangular.all('user/authorize').post('params', {
                    authToken: authToken
                }).then(function(data) {
                    console.log(data);
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