mrApp.factory('UserService', function(Restangular) {

    return {
        
        getUser: function() {
            return Restangular.one('people').get().$object;
        },
        
        createUser: function(email, password) {
            var hash = CryptoJS.SHA3(password, {outputLength: 512});
            var promise = Restangular.all('people').post('person', {email: email, password: hash.toString(CryptoJS.enc.Base64)});
            
            promise.then(function(data) {
                if (data.error) {
                    return data.error;
                } else {
                    user.authenticateUser(data.token);
                }
            });
        },
        
        authenticateUser: function(token) {
            
        }
   }
});