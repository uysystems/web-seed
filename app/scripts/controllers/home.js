'use strict';
/**
 * @ngdoc function
 * @name webSeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webSeedApp
 */
webApp.controller('HomeCtrl',['$scope','$http', function ($scope,$http) {
	$scope.cat_images = sp.host+'img/site/product_categories/';
	
	$http({
		method 	: 'get',
		url		: sp['shop_category'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.shop_categories = data.ecommerce_categories;
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	//homeblock
	$scope.block_images = sp.host+'img/site/homeblock/';
	$http({
		method 	: 'get',
		url		: sp['homeblock'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.homeblock = data.homeblock;
		
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});


	$scope.shop_brand_image_location = sp['host']+'img/site/product_brands/';
	
	
	//get brand list
	$http({
		method 	: 'get',
		url		: sp['shop_barnds'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.brandList = data.ecommerce_brands;
	})
	
	
	
	//
	$scope.$watch('brandList',function(nv,ov){
		if(nv!=ov){
			$scope.brandList = nv;
console.log($scope.brandList);
		}
	});

}]);


