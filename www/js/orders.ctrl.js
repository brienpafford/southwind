angular
  .module('southwind')
  .controller('OrderCtrl', function ($http){
  var order = this;

  $http
    .get('/')
    .success(function (res){
    order.data = res.orders;

  });
});