'use strict';
/**
 * @ngdoc function
 * @name webSeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webSeedApp
 */
webApp.controller('HomeCtrl',['$scope','$http','$sce', function ($scope,$http,$sce) {
	$scope.gallery_images = sp.host+'img/site/gallery/';
	
	$http({
		method 	: 'get',
		url		: sp['gallery'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.gallery = data.gallery;
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
		url		: sp['shop_barnds_image'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.brandList = data.ecommerce_brands;
		
	})
	
	
	
	//
	$scope.$watch('brandList',function(nv,ov){
		if(nv!=ov){
			$scope.brandList = nv;
			console.log($scope.brandList)
			//$scope.brandAnimation();
			
		}
	});
	
	$scope.brandAnimation = function(){
		//var dom = $('ul.horizontalSlider');
	}
	
	
	$scope.shortDescription = function(data,length){
		return $sce.trustAsHtml((data.replace(/<\/?[^>]+>/gi, '')).substr(0,length));
	}
	

}]);


