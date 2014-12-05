'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopOrderCtrl',['$scope','$http','$sce','$routeParams','$window', function ($scope,$http,$sce,$routeParams,$window) {
   $window.sessionStorage.removeItem('uycart')
	
	$http({
		method : 'POST',
		url : sp['shop_order_status'],
		data : {
			paymentStatus : $routeParams.Status,
			paymentDetails : $routeParams,
			orderId : $routeParams.OrderID,
		},
		cache : false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
    		
    	}).success(function(data){
    		if(data.order_payment_status.status == true){
    			$scope.OrderConfirmationData = data.order_payment_status.message;
    			$scope.OrderBillingData = angular.fromJson($scope.OrderConfirmationData.billingDetails.Client.details)
    		}else{
    			$scopeOrderError = true;
    			$scope.OrderConfirmationData = data.order_payment_status.message;
    		}
    		
    	})
    	
    	$scope.$watch('OrderConfirmationData',function(nv,ov){
    		if(nv != ov){
    			$scope.OrderConfirmationData = nv;
    			console.log($scope.OrderConfirmationData)
    		}
    	})
}]);
