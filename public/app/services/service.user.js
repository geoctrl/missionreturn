mrApp.factory('UserService', function($q, Restangular) {
    var user;
    
    return {
        
        getUser: function(userUri) {

            return Restangular.one('people').get({'user-uri': userUri}).$object;
        }
    }
});