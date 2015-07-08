mrApp.directive('navigation', function($state) {

    var navigationLink = function(scope, element, attrs) {
        scope.currentState = $state.current.name;
    };

    return {
        restrict: 'E',
        link: navigationLink,
        templateUrl: '/app/components/navigation/navigation.html'
    }
});