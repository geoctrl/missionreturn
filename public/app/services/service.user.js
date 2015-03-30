mrApp.factory('UserService', function($q, Restangular) {
    var user;
    
    return {
        
        getUser: function(userUri) {

            return Restangular.one('people', userUri).get().$object;
        }
    }
});