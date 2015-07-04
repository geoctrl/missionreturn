describe('Unit: JournalCtrl', function() {

    beforeEach(module('missionReturnApp'));

    var ctrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        ctrl = $controller('journalCtrl', function() {
            $scope: scope
        })
    }));

    if('should create $scope.greeting when calling sayHello',
        function() {
            expect(scope.greeting).toBeUndefined();
            scope.sayHello();
            expect(scope.greeting).toEqual("Hello Ari");
        });

});