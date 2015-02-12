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
    vm.bannedWord = false;

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
        })

        .then(function(result) {
          
          if(result.data.meta.code == '400') {
            vm.bannedWord = true;
            vm.searchInProgress = false;
            vm.reset();
          } else {
            vm.bannedWord = false;
            vm.receivedImages = result.data.data;
            vm.imageCount = vm.receivedImages.length;
            vm.searchInProgress = false;
            vm.cachedTag = vm.searchInput;
            vm.searchInput = '';
            vm.searchForm.$setPristine();
            vm.submitted = false;
          }
        })
        
        .catch(function(result) {
          console.log(result)
          vm.searchInProgress = false;
          vm.errorMessage = true;
          vm.imageCount = 0;
        })

      } else {
        vm.searchForm.submitted = true;
      }
    } 

    vm.reset = function() {
      vm.imageCount = false;
      vm.receivedImages = false;
    }
  });