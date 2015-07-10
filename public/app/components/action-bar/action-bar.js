mrApp
    .directive('actionBar', function($timeout) {

        var actionBarCtrl = function($scope) {

            $timeout(function() {
                $scope.$parent.actionBarSelect.style.transform = 'scaleX(1.1) scaleY(1.1)';
                animate();
            });

            $scope.$watch('select', function(newVal, oldVal) {
                animate();
            });

            var animate = function() {
                if ($scope.select) {
                    if ($scope.$parent.actionBarSelect.style.transform == 'scaleX(1.1) scaleY(1.1)') {
                        Velocity($scope.$parent.actionBarSelect, {
                            scaleX: [1, 1.1],
                            scaleY: [1, 1.1],
                            opacity: 1
                        }, {
                            display: 'block',
                            begin: function() {
                                $scope.$parent.actionBarSelect.style.zIndex = 1;
                            }
                        })
                    }
                } else {
                    Velocity($scope.$parent.actionBarSelect, {
                        scaleX: [1.1, 1],
                        scaleY: [1.1, 1],
                        opacity: 0
                    }, {
                        display: 'none',
                        complete: function() {
                            $scope.$parent.actionBarSelect.style.zIndex = 0;
                        }
                    })
                }
            }
        };

        return {
            restrict: 'E',
            scope: {
                select: '='
            },
            controller: actionBarCtrl
        }
    })

    .directive('actionBarDefault', function() {
        return {
            restrict: 'E',
            require: '^actionBar',
            controller: function($scope, $element) {
                $scope.actionBarDefault = $element[0];
            }
        }
    })

    .directive('actionBarSelect', function() {
        return {
            restrict: 'E',
            require: '^actionBar',
            controller: function($scope, $element) {
                $scope.actionBarSelect = $element[0];
            }
        }
    });