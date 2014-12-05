'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopProceedCtrl',['$scope','$http','$sce','$routeParams','$window', function ($scope,$http,$sce,$routeParams,$window) {
	
	//check login
	if($window.sessionStorage.getItem('loginDetails') == null){
		$window.location.href = '/#/login/proceed';
	}
	
	$('.checkoout').hide();
	//
	$scope.log_details = JSON.parse($window.sessionStorage.getItem('loginDetails'));
	$scope.user_details =  JSON.parse($scope.log_details.Client.details);
	$scope.payment_methods = new Object();
	
	
		if($scope.sameAsBilling == 'checked'){
			$scope.address_line_1 = $scope.user_details.address_line_1;
			$scope.address_line_2 = $scope.user_details.address_line_2;
			$scope.zip = $scope.user_details.zip;
		}else{
			
		}
		
	
	$scope.$watch('sameAsBilling',function(){
		console.log($scope.sameAsBilling)
		
		if($scope.sameAsBilling == 'true'){
			$scope.address_line_1 = $scope.user_details.address_line_1;
			$scope.address_line_2 = $scope.user_details.address_line_2;
			$scope.zip = $scope.user_details.zip;
		}else{
			
		}
	})
	
	//get payment methods
	/*
	$http({
		method 	: 'get',
		url		: sp['shop_payment_methods'],
		cache 	: false,
		responseType : 'json',
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		
		$scope.payment_methods = data.ecommerce_payment_methods
		
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	*/
	$scope.confirmNow = function(){
		//make readonly for shoping address
		var all_inputs = $('.proceed_input');
		$.each(all_inputs,function(ind,val){
			$(val).attr('readonly',true)
		})
		
		//remove non-selected payment methods
		var all_payment_methods = $('.proceed_input_payment');
		$.each(all_payment_methods,function(ind,val){
			if($(val).is(':checked')){
				$(val).attr('readonly',true)
				$scope.selected_payment_method = $(val).val();
			}else{
				var removeable = $(val).parent('li');
				$(removeable).remove();
			}
		});
		$('.confirm').hide();
		$('.checkoout').show();
		
	}
	
	//order now
	var cart_products = $window.sessionStorage.getItem('uycart');
    $scope.PorductsInCart = JSON.parse(cart_products);
  
    $scope.totalCost = 0;
    angular.forEach($scope.PorductsInCart,function(val,index){
    	 $scope.totalCost += parseFloat(val.cost);
    });
	$scope.orderNow = function(){
    	var total_price = 0;
        angular.forEach($scope.PorductsInCart,function(val,ind){
        	total_price += parseFloat(val.cost);
        });
        
       $scope.shippingDetails = new Object();
       $scope.shippingDetails.ship_address_1 = $scope.address_line_1;
       $scope.shippingDetails.ship_address_2 = $scope.address_line_2;
       $scope.shippingDetails.zip = $scope.zip;
      
    	$http({
    		method 	: 'post',
    		url		: sp['shop_order'],
    		data	: {
		    			cart 			: $scope.PorductsInCart,
		    			client_details 	: $window.sessionStorage.getItem('loginDetails'),
		    			shipping_detail : $scope.shippingDetails,
		    			//payment			: $scope.selected_payment_method,
		    			total_cost		: total_price
		    		  },
    		cache 	: false,
    		headers : {'content-type': 'application/x-www-form-urlencoded'}
    		
    	}).success(function(data){
    		if(data.ecommerce_checkout.status == true){
    			$window.location.href = data.ecommerce_checkout.message
    		}else{
    			console.log('error');
    		}
    	})
    	
    	
    	
    	
    }
	
	//watch
	
	$scope.$watch('payment_methods',function(nv, ov){
		$scope.payment_methods = nv;
	})
	
}]);
