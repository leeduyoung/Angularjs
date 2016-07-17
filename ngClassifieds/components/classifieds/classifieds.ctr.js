(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            // $http.get('data/classifieds.json').then(function(classifieds) {
            //     console.log(classifieds);
            //     $scope.classifieds = classifieds.data;
            // });

            var vm = this;

            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar = closeSidebar;
            vm.deleteClassified = deleteClassified;
            vm.editing;
            vm.editClassified = editClassified;
            vm.openSidebar = openSidebar;
            vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;

            classifiedsFactory.getClassifieds().then(function(classifieds) {
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            });

            $scope.$on('newClassified', function(event, classified) {
                classified.id = vm.classifieds.length + 1;
                vm.classifieds.push(classified);
                showToast('Classified saved!');
            });

            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });

            var contact = {
                name : "Duyoung Lee",
                phone : "(031) 283-1476",
                email : "leeduyoung@naver.com"
            }

            function openSidebar() {
                //$mdSidenav('left').open();
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                console.log(classified);
                if(classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast("Classified Saved!");
                }                
            }

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id:classified.id,
                    classified: classified
                });
            }

            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Classified edited!");
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    var index = $scope.classifieds.indexOf(classified);
                    vm.splice(index, 1);
                }, function() {
                    
                })
            }
    
            function showToast(message) {
                $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(3000)
                );
            }

            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });
                return _.uniq(categories);
            }
        });
})();