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
            controller: function($scope, $element) {

            },
            templateUrl: '/app/components/header/header-app.html'
        }
    });