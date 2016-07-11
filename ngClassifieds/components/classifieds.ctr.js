(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($scope) {

            $scope.name = {
                first: "Duyoung",
                last: "Lee"
            };

            $scope.message = "Hello, world!!";
        });

})();