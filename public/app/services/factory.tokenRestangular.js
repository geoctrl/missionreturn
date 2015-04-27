mrApp.factory('TokenRestangular', function(Restangular, TokenService) {
    return Restangular.withConfig(function(restConfig) {
        restConfig.setDefaultHeaders({
            token: TokenService.getToken()
        });
        restConfig.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            console.log(data, url, response);
        });

    })
});