'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopingHistoryCtrl',['$scope','$http','$sce','$routeParams','$window','$route','$compile', function ($scope,$http,$sce,$routeParams,$window,$route,$compile) {
   
	if($window.sessionStorage.getItem('loginDetails') == null){
		$window.location.href = '/#/login';
	}else{
		
		
		//sp['shop_history']
		
		$http({
    		method 	: 'post',
    		url		: sp['shop_history'],
    		data	: {
		    			client_details : $window.sessionStorage.getItem('loginDetails')
		    		  },
    		cache 	: false,
    		headers : {'content-type': 'application/x-www-form-urlencoded'}
    		
    	}).success(function(data){

    		$scope.history_ordered_data = data.ecommerce_history.ordered;
    		$scope.history_processing_data = data.ecommerce_history.processing;
    		$scope.history_completed_data = data.ecommerce_history.completed;
    		$scope.history_cancelled_data = data.ecommerce_history.cancelled;
    		

    	}).error(function(status){
    		$scope.error_message = 'Network Error occured. Please reload page.';
    	});
	}
	
	$scope.showTab = function(tab_view_selector){
		$('.tab-pane').hide();
		$('#'+tab_view_selector).show();
	}
	$scope.getProductDetais = function(data){
		var data = JSON.parse(data)
		var html= '';
		$.each(data,function(ind,val){
			var attr_html = ''
				$.each(val.attributes,function(attr_ind, attr_val){
					attr_html+= attr_ind+' : '+attr_val+' '
				})
			html += val.product_title+' Attributes : ' + attr_html+'Quantity: '+val.quantity+'Total Cost : '+val.cost;
		})
		
		
		return html;
	}
	
	
}]);
