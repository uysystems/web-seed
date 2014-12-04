'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopBrandsCtrl',['$scope','$http','$sce','$routeParams', function ($scope,$http,$sce,$routeParams) {
    //get
	$scope.shop_brand_image_location = sp['host']+'img/site/product_brands/';
	
	
	
	
	$http({
		method 	: 'get',
		url		: sp['shop_barnds_image'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.brandListImages = data.ecommerce_brands;
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	//get brand list
	$http({
		method 	: 'get',
		url		: sp['shop_barnds'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.brandList = data.ecommerce_brands;
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	//
	$scope.$watch('brandList',function(nv,ov){
		if(nv!=ov){
			$scope.brandList = nv;
		}
	});
	
	$scope.$watch('brandListImages',function(nv,ov){
		if(nv!=ov){
			$scope.brandListImages = nv;
		}
	});
	
	
	
	$scope.textToSafeHtml = function(data) {
		return $sce.trustAsHtml(data);
	}
	
	$scope.shortDescription = function(data,length){
		return $sce.trustAsHtml((data.replace(/<\/?[^>]+>/gi, '')).substr(0,length));
	}
	
	
}]);
