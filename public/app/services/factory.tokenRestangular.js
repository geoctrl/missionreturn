mrApp.factory('TokenRestangular', function(Restangular, TokenService) {
    return Restangular.withConfig(function(restConfig) {
        restConfig.setDefaultHeaders({
            token: TokenService.getToken()
        });
    })
});