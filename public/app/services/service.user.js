mrApp.service('UserService', function(Restangular, TokenService, $state) {

    return {
        
        getUser: function() {
            return Restangular.one('people').get().$object;
        },
        
        createUser: function(email, password) {
            var self = this;
            var promise = Restangular.all('people').post('person', {
                email: email,
                password: self.passwordHash(password)
            });
            
            promise.then(function(data) {
                if (data.error) {
                    return data.error;
                } else {
                    if (data.token) {
                        user.authenticateUser(data.token);
                    } else {
                        return {error: 'something is amiss...no token'}
                    }
                }
            });
        },

        authenticateUser: function(token) {
            TokenService.setToken(token);
            $state.go(user);
        },
        
        // helper functions
        passwordHash: function(string) {
            return CryptoJS.SHA3(string, {outputLength: 512}).toString(CryptoJS.enc.Base64);
        }

    }
});