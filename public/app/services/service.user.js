mrApp.service('UserService', function(
    Restangular, TokenService, appConstants, $state, $q, localStorageService, jwtHelper, TokenRestangular, errorConstants) {

    return {
        
        getUser: function() {
            return TokenRestangular.one('people').get();
        },
        
        createUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('people').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    resolve(data);

                });
            });
        },
        
        loginUser: function(email, password) {
            return $q(function(resolve, reject) {
                Restangular.all('login').post('params', {
                    email: email,
                    password: password
                }).then(function(data) {
                    if (!data.error) {
                        TokenService.setToken(data.token);
                    }
                    resolve(data);
                })
            })
        },

        logoutUser: function() {
            TokenService.deleteToken();
            $state.go('login', {
                flashMessage: {
                    content: 'Logged Out Successfully'
                }
            })
        },

        checkUserExists: function() {

        },
        
        authorizeUser: function(authToken) {
            return $q(function(resolve, reject) {
                Restangular.all('authorize').post('params', {
                    authToken: authToken
                }).then(function(data) {
                    if (!data.error) {
                        TokenService.setToken(data.token);
                    }
                    resolve(data);
                });
            })
        },
        
        isAuthenticated: function() {
            if (TokenService.getToken()) {
                if (jwtHelper.isTokenExpired(TokenService.getToken())) {
                    TokenService.deleteToken();
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

    }
});


angular.module("app.controllers", [])
    .controller("gaugeCtrl", ["$scope","config","myService",
        function ($scope,config,myService) {
            var v = 0;
            var dataarr = [];
            var promise = myService.getdata();
            console.log(promise);
            var tp = promise.then(function (data) {
                $players = data.data;
                console.log($players.Tweets);
                ($players.Tweets).forEach(function (index, element) {
                    v = v + (index.FAVOURITE_COUNT);
                    // console.log(index.FAVOURITE_COUNT);
                });
                console.log(v);
                dataarr.push({maxValue: 800, animationSpeed: 100, val: v});
                console.log(dataarr);
                // return dataarr;
                $scope.gaugeHome.gaugeData = dataarr;
            });
            return $scope.gaugeHome = {
                gaugeData: [],
                gaugeOptions: {
                    lines: 12,
                    angle: 0,
                    lineWidth: 0.47,
                    pointer: {
                        length: 0.6,
                        strokeWidth: 0.03,
                        color: "#555555"
                    },
                    limitMax: "false",
                    colorStart: config.secondary_color,
                    colorStop: config.secondary_color,
                    strokeColor: "#F5F5F5",
                    generateGradient: !0,
                    percentColors: [
                        [0, config.secondary_color],
                        [1, config.secondary_color]
                    ]
                }
            }
        }]);