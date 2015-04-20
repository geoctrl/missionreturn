mrApp.factory('UserService', function(Restangular) {

    return {
        
        userState: '0',
        
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
                    user.authenticateUser(data.token);
                }
            });
        },
        
        authenticateUser: function(token) {
            
        },
        
        
        // helper functions
        passwordHash: function(string) {
            return CryptoJS.SHA3(string, {outputLength: 512}).toString(CryptoJS.enc.Base64);
        }

    }
});