mrApp.factory('UserService', function(Restangular) {
    var user;
    
    return {
        
        getUser: function(uri) {
            // api/people/:uri
            return user = Restangular.one('people', uri).get().$object;
        },
        
        createUser: function(email, password) {
            Restangular.all('people').post({})
            
        },
        
        loginUser: function(token) {
            
        }
    }
});