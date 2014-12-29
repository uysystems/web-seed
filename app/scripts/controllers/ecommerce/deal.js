'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('DealCtrl',['$scope','$http','$sce','$routeParams', function ($scope,$http,$sce,$routeParams) {
	$scope.enableAttributeSection = 'no';
	//get
	$scope.shop_image_location = sp['product_image_root'];
	$scope.shop_loading = true;
	
	var post_url = sp.shopDeals;
	//get data
	$http({
		method 	: 'POST',
		url		: post_url,
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.shop_product_list = data.ecommerce_product_list;
		$scope.pagination = data.paginagtion;
		$scope.shop_loading = false;
		$scope.error_message = '';
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	
	$scope.textToSafeHtml = function(data) {
		return $sce.trustAsHtml(data);
	}
	
	$scope.shortDescription = function(data,length){
		return $sce.trustAsHtml((data.replace(/<\/?[^>]+>/gi, '')).substr(0,length));
	}
	
	
	
	//pagination
	$scope.loadPage = function(pageNo,$event){
		$('.pagination li').removeClass('active');
		$($event.target).parent('li').addClass('active');
		$http({
			method 	: 'POST',
			url		: post_url,
			data	: {
				pageNo : pageNo
			},
			cache 	: false,
			headers : {'content-type': 'application/x-www-form-urlencoded'}
			
		}).success(function(data){
			$scope.shop_product_list = data.ecommerce_product_list;
			$scope.pagination = data.paginagtion;
			$scope.shop_loading = false;
			$scope.error_message = '';
		}).error(function(status){
			$scope.error_message = 'Network Error occured. Please reload page.';
		});
	}
}]);
