angular
	.module('southwind')

	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when('', '/');
		$urlRouterProvider.otherwise('/order');
		$stateProvider
			.state('orders', {
				url: '/',
				templateURL: '/order/index.html',
				controller: 'OrderCtrl',
				controllerAs: 'order'
			});
	});