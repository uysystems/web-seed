'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('PageCtrl',['$scope','$http','$routeParams','$sce', function ($scope,$http,$routeParams,$sce) {
	$scope.single_loading = true;
	$scope.page = new Object();
	$http({
		method 	: 'post',
		url		: sp['single_page']+$routeParams.id+'.json',
		cache 	: false,
		responseType : 'json',
		headers : {'content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data){
		$scope.page.title = data.single_page[0]['WebPage']['title'];
		$scope.page.details = $sce.trustAsHtml(data.single_page[0]['WebPage']['description']);
		$scope.single_loading = false;
		$scope.error_message = '';
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
  }]);
