mrApp.service('TokenService', function(Restangular, localStorageService, appConstants) {
    
    
    return {
        getToken: function() {
            return localStorageService.get(appConstants.token);
        },
        setToken: function(token) {
            this.clearToken();
            return localStorageService.set(appConstants.token, token);
        },
        clearToken: function() {
            return localStorageService.remove(appConstants.token);
        }
    }
});
