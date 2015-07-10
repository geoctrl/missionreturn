mrApp.config(function($stateProvider) {
        $stateProvider
            .state('journal', {
                url: '/journal',
                templateUrl: '/app/journal/journal.html',
                controller: 'journalCtrl',
                params: {
                    flashMessage: {
                        title: null,
                        content: null
                    }
                }
            })
    })

    .controller('journalCtrl', function($scope) {

        $scope.controlEntry = {
            selected: 0,
            getSelected: function() {
                var count = 0;
                angular.forEach($scope.journal.entries, function(entry) {
                    if (entry.checked) {
                        count++;
                    }
                });
                this.selected = count;
                return count;
            },
            deselect: function() {
                var self = this;
                angular.forEach($scope.journal.entries, function(entry) {
                    entry.checked = false;
                    self.getSelected();
                });
            }
        };

        $scope.journal = {
            entries: [
                {
                    name: 'On the Job',
                    date: 1436539816,
                    content: 'bla bla bla bla'
                },
                {
                    name: 'On the Job',
                    date: 1436539816,
                    content: 'bla bla bla bla'
                }
            ]
        };
    });