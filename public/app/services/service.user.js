mrApp.service('UserService', function(
    Restangular, TokenService, appConstants, $state, $q, localStorageService, jwtHelper, TokenRestangular) {

    return {
        
        getUser: function() {
            return TokenRestangular.one('people').get().$object;
        },
        
        createUser: function(email, password) {
            var self = this;
            
            return $q(function(resolve, reject) {
                Restangular.all('people').post('person', {
                    email: email,
                    password: self.passwordHash(password)
                }).then(function(data) {
                    if (data.error) {
                        resolve(data);
                    } else {
                        if (data.token) {
                            TokenService.setToken(data.token);
                            $state.go('user');
                        } else {
                            return {error: 'something is amiss...no token'}
                        }
                    }
                });
            });
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
        },
        
        // helper functions
        passwordHash: function(string) {
            return CryptoJS.SHA3(string, {outputLength: 512}).toString(CryptoJS.enc.Base64);
        }

    }
});