mrApp.factory('UserService', function(Restangular) {
    var user;
    
    return {
        
        getUser: function(uri) {
            // api/people/:uri
            return user = Restangular.one('people', uri).get().$object;
        },
        
        createUser: function(email, password) {
            var hash = CryptoJS.SHA3(password, {outputLength: 512});
            return Restangular.all('people').post('person', {email: email, password: hash.toString(CryptoJS.enc.Base64)});
        },
        
        authenticateUser: function(token) {
            
        }
    }
});