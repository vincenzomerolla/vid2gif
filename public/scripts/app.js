(function (window, angular) {

  function MainController($scope) {
    this.init = { 
      singleFile: true,
      testChunks: false
    };
    this.dragClassName = '';


    $scope.$on('flow::complete', function (event, $flow, flowFile) {
      console.log(event, $flow, flowFile);
    });
  }




  angular
    .module('vid2gif', ['flow'])
    .controller('MainController', MainController)
    .config(['flowFactoryProvider', function (flowFactoryProvider) {
      flowFactoryProvider.defaults = {
        target: '/upload'
      };
      // You can also set default events:
      flowFactoryProvider.on('catchAll', function (event) {
        console.log(event)
      });
    }]);

})(window, angular); 