mrApp
    .directive('checkbox', function($timeout) {

        var checkboxCtrl = function($scope, $element) {

            $scope.animate = function(bool) {
                if (bool) {
                    Velocity($scope.checked[0], 'stop');
                    Velocity($scope.checked[0], {
                        opacity: 1,
                        rotateZ: [0, '90deg']
                    }, {
                        duration: 200
                    });
                    Velocity($scope.unchecked[0], 'stop');
                    Velocity($scope.unchecked[0], {
                        opacity: 0,
                        rotateZ: ['-90deg', 0]
                    }, {
                        duration: 200
                    });
                } else {
                    Velocity($scope.unchecked[0], 'stop');
                    Velocity($scope.unchecked[0], {
                        opacity: 1,
                        rotateZ: [0, '90deg']
                    }, {
                        duration: 200
                    });
                    Velocity($scope.checked[0], 'stop');
                    Velocity($scope.checked[0], {
                        opacity: 0,
                        rotateZ: ['-90deg', 0]
                    }, {
                        duration: 200
                    });
                }
            };


            $scope.ngModel = $scope.ngModel?$scope.ngModel:false;
            $timeout(function() {
                $scope.animate($scope.ngModel);
            });
            $element.on('click', function() {
                $scope.ngModel = $scope.ngModel?false: true;
                $scope.$apply();
                $scope.animate($scope.ngModel);
            });


        };

        return {
            restrict: 'E',
            controller: checkboxCtrl,
            scope: {
                ngModel: '='
            },
            template: '<i class="gi gi-check-box" checkbox-checked></i><i class="gi gi-check-box-outline-blank" checkbox-unchecked></i>'
        }
    })
    .directive('checkboxChecked', function() {
        return {
            restrict: 'A',
            require: '^checkbox',
            controller: function($scope, $element) {
                $scope.checked = $element;
            }
        }
    })
    .directive('checkboxUnchecked', function() {
        return {
            restrict: 'A',
            require: '^checkbox',
            controller: function($scope, $element) {
                $scope.unchecked = $element;
            }
        }
    });