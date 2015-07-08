mrApp.directive('layoutHeight', function($window) {
    return {
        link: function(scope, element, attrs) {
            function elementResize() {
                element[0].style.minHeight = $window.innerHeight + 'px';
            }

            angular.element($window).on('resize', _.debounce(elementResize, 100));

            elementResize();
        }
    }
});