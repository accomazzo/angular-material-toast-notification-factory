app.factory("Toast", function createToastFactory ($mdToast, $mdDialog) {
    return function make (newObj) {
        var hMap = {
            success : '<span class="glyphicon glyphicon-ok" aria-hidden="true">',
            danger : '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true">',
            warning : '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true">',
            info : '<span class="glyphicon glyphicon-info-sign" aria-hidden="true">'
        }
        if(newObj.locals.toastIcon) {
            newObj.locals.toastIcon = hMap[newObj.locals.toastIcon];
        }
        var makeObj = Object.create(null);
        makeObj.controller = newObj.controller || 'ToastCtrl';
        makeObj.position = newObj.position || 'top right';
        makeObj.templateUrl = newObj.templateUrl || 'toast-template';
        makeObj.parent = newObj.parent || '#toast-container';
        makeObj.locals = newObj.locals || {toastText: "text", toastIcon: toastIconSuccess} ;
        makeObj.hideDelay = 4000 || newObj.hideDelay;
        $mdToast.show(makeObj);
    }
});

app.controller('ToastCtrl', function($scope, $mdToast, $mdDialog, locals, $sanitize) {
    $scope.customToast = {};
    $scope.customToast["text"] = locals.toastText;
    $scope.customToast["icon"] = locals.toastIcon;
    $scope.closeToast = function() {
        if (isDlgOpen) return;

        $mdToast
            .hide()
            .then(function() {
                isDlgOpen = false;
            });
    };

    $scope.openMoreInfo = function(e) {
        if ( isDlgOpen ) return;
        isDlgOpen = true;

        $mdDialog
            .show($mdDialog
                .alert()
                .title('More info goes here.')
                .textContent("testeroo")
                .ariaLabel('More info')
                .ok('Got it')
                .targetEvent(e)
            )
            .then(function() {
                isDlgOpen = false;
            })
    };
});

//EXAMPLE
Toast({locals : {toastText: 'Apply BCE Failed', toastIcon: 'warning'}});
