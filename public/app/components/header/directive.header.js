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
                            opacity: 0
                        }, {
                            display: 'none',
                            easing: 'ease-in',
                            duration: 400
                        })
                    } else {
                        element.addClass('isActive');
                        Velocity(element, {
                            opacity: 1
                        }, {
                            display: 'block',
                            duration: 400,
                            easing: 'ease-out'
                        });
                    }
                }
            }
        }
    });