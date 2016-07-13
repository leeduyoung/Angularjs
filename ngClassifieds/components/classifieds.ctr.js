(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {

            // $http.get('data/classifieds.json').then(function(classifieds) {
            //     console.log(classifieds);
            //     $scope.classifieds = classifieds.data;
            // });

            classifiedsFactory.getClassifieds().then(function(classifieds) {
                $scope.classifieds = classifieds.data;
            });

            var contact = {
                name : "Duyoung Lee",
                phone : "(031) 283-1476",
                email : "leeduyoung@naver.com"
            }

            $scope.openSidebar = function() {
                $mdSidenav('left').open();
            }

            $scope.closeSidebar = function() {
                $mdSidenav('left').close();
            }

            $scope.saveClassified = function(classified) {
                console.log(classified);
                if(classified) {
                    classified.contact = contact;
                    $scope.classifieds.push(classified);
                    $scope.classified = {};
                    $scope.closeSidebar();
                    $mdToast.show(
                        $mdToast.simple()
                            .content("Classified Saved!")
                            .position('top, right')
                            .hideDelay(3000)
                    );
                }                
            }

            $scope.saveEdit = function() {
                
            }
        });
})();