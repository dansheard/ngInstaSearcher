angular.module('ngInstaSearcher', ['ngMessages', 'ngAnimate'])
  .controller('MainCtrl', function($http) {

    var vm = this;
    vm.submitted = false;
    vm.searchInput = '';
    vm.receivedImages = false;
    vm.searchInProgress = false;
    vm.imageCount = false;
    vm.errorMessage = false;
    vm.cachedTag = false;

    vm.postForm = function() {

      if (vm.searchForm.$valid) {
        vm.searchInProgress = true;

        var url = "https://api.instagram.com/v1/tags/"+encodeURIComponent(vm.searchInput)+"/media/recent";
        var request = {
            client_id: 'a39632cfe2f542a3be7cd1a1a89746f0',
            callback: 'JSON_CALLBACK'
        };

        $http({
            method: 'JSONP',
            url: url,
            params: request
        }).

        then(function(result) {
          vm.receivedImages = result.data.data;
          vm.imageCount = vm.receivedImages.length;
          vm.searchInProgress = false;
          vm.cachedTag = vm.searchInput;
          vm.searchInput = '';
        }).

        catch(function(result) {
          vm.searchInProgress = false;
          vm.errorMessage = true;
          vm.imageCount = 0;
        })

      } else {
        vm.searchForm.submitted = true;
      }
    } 
  });