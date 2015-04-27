mrApp.service('TokenService', function(Restangular, localStorageService, appConstants) {
    
    
    return {
        getToken: function() {
            return localStorageService.get(appConstants.token);
        },
        setToken: function(token) {
            this.deleteToken();
            return localStorageService.set(appConstants.token, token);
        },
        deleteToken: function() {
            return localStorageService.remove(appConstants.token);
        }
    }
});
