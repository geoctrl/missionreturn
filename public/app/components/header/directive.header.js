mrApp.directive('header', function() {
    return {
        restrict: 'A',
        replace: true,
        controller: function($scope, $element) {
            
        },
        templateUrl: '/app/components/header/header.html'
    }
})

    .directive('headerApp', function() {
        return {
            restrict: 'A',
            replace: true,
            controller: function($scope, $element) {},
            templateUrl: '/app/components/header/header-app.html'
        }
    })

    .directive('headerNav', function() {
        return {
            require: '^headerApp',
            link: function(scope, element, attrs) {
                scope.toggleHeaderNav = function() {
                    if (element.hasClass('isActive')) {
                        element.removeClass('isActive');
                        Velocity(element, {
                            rotateY: '90deg',
                            boxShadowBlur: '50px',
                            boxShadowX: '-50px'
                        }, {
                            display: 'none',
                            duration: 700,
                            complete: function() {
                                element.parent().css('display', 'none');
                            }
                        })
                    } else {
                        element.addClass('isActive');
                        element.parent().css('display', 'block');
                        Velocity(element, {
                            transformOriginX: '100%',
                            rotateY: '90deg',
                            boxShadowBlur: '50px',
                            boxShadowX: '-50px'
                        }, {
                            duration: 0
                        });
                        Velocity(element, {
                            rotateY: '20deg',
                            backgroundColor: '#fff',
                            boxShadowBlur: '10px',
                            boxShadowX: '0'
                        }, {
                            display: 'block',
                            duration: 700
                        });
                    }
                }
            }
        }
    });