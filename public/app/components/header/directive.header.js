mrApp.directive('header', function() {
    return {
        restrict: 'A',
        replace: true,
        controller: function($scope, $element) {
            
        },
        templateUrl: '/app/components/header/header.html'
    }
})

    .directive('headerLogo', function($timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attr) {
                
                var logoM = $(element).find('.logo-m'),
                    logoGroupM = $(element).find('.logo-group-m'),
                    logoR = $(element).find('.logo-r'),
                    logoGroupR = $(element).find('.logo-group-r'),
                    logoPeriod = $(element).find('.logo-period');
                
                scope.logoControl = {
                    open: function() {
                        $.Velocity(logoGroupM, {
                            translateX: '0',
                            opacity: 1
                        })
                    },
                    close: function() {
                        logoGroupM
                            .velocity('stop')
                            .velocity({
                                translateX: '-50px',
                                opacity: 0
                            });
                        
                        logoGroupM
                            .velocity('stop')
                            .velocity({
                                translateX: '-74px'
                            });
                        logoGroupR
                            .velocity('stop')
                            .velocity({
                                translateX: '-130px',
                                opacity: 0
                            })
                        logoPeriod
                            .velocity('stop')
                            .velocity({
                                translateX: '-140px'
                            })
                    }
                };
                
                $timeout(function() {
                    scope.logoControl.close();
                }, 1000)
            }
        }
    });