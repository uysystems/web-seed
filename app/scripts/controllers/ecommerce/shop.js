'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopCtrl',['$scope','$http','$sce','$routeParams', function ($scope,$http,$sce,$routeParams) {
	$scope.enableAttributeSection = 'no';
	//get
	$scope.shop_image_location = sp['product_image_root'];
	$scope.shop_loading = true;
	if($routeParams.catid != undefined){
		var post_url = sp['shop_product_by_category'] + $routeParams.catid + '.json';
		$scope.enableAttributeSection = 'yes';
		//get attributes by type
		$http({
			method 	: 'POST',
			url		: sp.getAttrByCatId,
			data	: {catId :$routeParams.catid},
			cache 	: false,
			headers : {'content-type': 'application/x-www-form-urlencoded'}
			
		}).success(function(data){
				$scope.attrList = data.attributesForFilter.message;
		});
	}else if($routeParams.brandid != undefined){
		var post_url = sp['shop_product_by_brand'] + $routeParams.brandid + '.json';
	}else{
		var post_url = sp['shop_random_product_list'];
	}
	
	//get data
	$http({
		method 	: 'get',
		url		: post_url,
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.shop_product_list = data.ecommerce_product_list;
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
	
	/*
	$scope.watch('attrList',function(nv,ov){
		console.log(nv)
		if(nv != ov){
			$scope.attrList = nv;
		}
	})
	*/
	
	$scope.filterByAttr = function(){
		var filterRules = new Object();
		angular.forEach($('.attrCheckBox'),function(val,ind){
			if($(val).is(':checked')){
				$(val).is(':checked')
				var attrId = $(val).attr('data-attrId');
				var attrVal = $(val).attr('data-attrValue');
				if(angular.isUndefined(filterRules[attrId])){
					filterRules[attrId] = new Object();
					filterRules[attrId][ind] = attrVal
				}else{
					filterRules[attrId][ind] = attrVal
				}
			}
		});
		
	
	if(Object.keys(filterRules).length >0){
		$http({
			method 	: 'POST',
			url		: sp.getProductsByAttrFilter,
			data	: {fileterRulesQuery : filterRules},
			cache 	: false,
			headers : {'content-type': 'application/x-www-form-urlencoded'}
			
		}).success(function(data){
			console.log(data)
		});
	}
	//	console.log(filterRules.length)
		
	}
}]);
