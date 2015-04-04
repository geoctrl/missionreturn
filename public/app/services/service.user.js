mrApp.factory('UserService', function(Restangular) {
    var user;
    
    return {
        
        getUser: function(userUri) {

            return user = Restangular.one('people', userUri).get().$object;
        }
    }
});