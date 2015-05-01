angular.module('tl.toaster-notify', [])
    
    .factory('tlNotifyService', function($compile, $timeout) {
        
        var notifyArray = [],
            notifyElement = '',
            notifyCount = 0;
        
        var defaultOptions = {
            duration: 5000, // set to 0 for static display
            type: 'default'
        };
        
        return {
            getNotify: function() {
                return notifyArray;
            },
            
            setNotifyElement: function(element) {
                notifyElement = element;
            },
            
            notify: function(content, options) {
                
                var notification = {},
                    self = this;

                if (content) {
                    notification.content = content;
                } else {
                    return {'tl-notify-error': 'content is required'}
                }
                
                if (options && options != undefined) {
                    notification.title = options.title?options.title:false;
                    notification.type = options.type?options.type:defaultOptions.type;
                    notification.duration = options.duration>=0?options.duration:defaultOptions.duration;
                }

                notification.id = notifyCount;

                notifyArray.push(notification);

                notifyCount++;

                if (notification.duration) {
                    self.removeNotifyTimed(notification);
                }

            },
            removeNotify: function(notification) {
                var removeElement = notifyElement.find('.tl-notify-id'+notification.id);
                //console.log(removeElement)
                notifyArray.splice(this.getIndexFromId(notification.id), 1);
            },
            
            getIndexFromId: function(notificationId) {
                var index = '',
                    found = false;
                angular.forEach(notifyArray, function(notification, key) {
                    if (notification.id==notificationId && !found) {
                        index = key;
                        found = true;
                    }
                });
                
                return index;
            },
            
            removeNotifyTimed: function(notification) {
                var self = this;
                $timeout(function() {
                    var index = self.getIndexFromId(notification.id);
                    if (notifyArray[index]) {
                        self.removeNotify(notification);
                    }
                }, notification.duration)
            }
        }
    })
    
    .directive('tlNotify', function(tlNotifyService) {
        return {
            restrict: 'E',
            controller: function($scope, $element) {
                $scope.notifyArray = tlNotifyService.getNotify();
                tlNotifyService.setNotifyElement($element);
                $scope.notifyClose = function(notification) {
                    tlNotifyService.removeNotify(notification);
                }
                
            },
            template: '<div class="tl-notify-container">\n    <div class="tl-notify tl-notify-id{{notification.id}}"\n         ng-repeat="notification in notifyArray"\n         ng-class="{\n     \'tl-notify-default\': notification.type==\'default\',\n     \'tl-notify-primary\': notification.type==\'primary\',\n     \'tl-notify-error\': notification.type==\'error\',\n     \'tl-notify-warning\': notification.type==\'warning\',\n     \'tl-notify-success\': notification.type==\'success\',}">\n        <button class="tl-notify-close" ng-click="notifyClose(notification);">\n            <i class="gi gi-close"></i>\n        </button>\n        <div class="tl-notify-title" ng-show="notification.title">{{notification.title}}</div>\n        <div class="tl-notify-content">{{notification.content}}</div>\n    </div>\n</div>\n'
        }
    });