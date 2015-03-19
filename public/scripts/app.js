(function (window, angular) {

  function MainController($scope, $timeout, $upload) {

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    var upload;

    $scope.upload = function(files) {    
      if (files && files.length) {
        var file = files[0];
        file.upload = $upload.upload({ url: '/upload', file: file})
          .success(function(data, status, headers, config) {
            $timeout(function() {
              file.result = data;
            });
          })
          .error(function(data, status, headers, config) {
            if (status > 0)
              $scope.errorMsg = res.status + ': ' + res.data;
          })
          .progress(function(e) {
            file.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
          });
      }
    };
  }


  function progressBar(ProgressBar) {
    return {
      restrict: 'EA',
      scope: {
        progress: '=',
        options: '='
      },
      link: function(scope, element, attrs) {

        var options = scope.options || {};
        var shape = new ProgressBar[attrs.shape](element[0], options);

        scope.$watch('progress', function(newVal, oldVal) {
          shape.setText(newVal + '%');
          shape.set(newVal/100);
        });
      }
    }
  }

  // MainController.prototype.upload = function(files) {
  //   console.log(files)
  // };





  angular
    .module('vid2gif', ['angularFileUpload'])
    .controller('MainController', MainController)
    .directive('progressBar', progressBar)
    .factory('ProgressBar', ['$window', function($window){
      return $window.ProgressBar;
    }]);

  angular.element(window).bind("dragover", function(e) {
    e.preventDefault();
  });

  angular.element(window).bind("drop", function(e) {
    e.preventDefault();
  });

})(window, angular); 