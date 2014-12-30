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
	
	$scope.setSameToBilling = function(){
		
		if($scope.sameAsBilling == true){
		    $scope.address_line_1 = $scope.user_details.address_line_1;
			$scope.address_line_2 = $scope.user_details.address_line_2;
			$scope.zip = $scope.user_details.zip;
		}else{
			$scope.address_line_1 = '';
			$scope.address_line_2 = '';
			$scope.zip = '';
		}
	}
	
	$scope.confirmNow = function(){
		var isvalid = validate_form("#confirmOrderForm");
		$('#confirmModal').modal('hide');  
		if(isvalid == true){
			//make readonly for shoping address
			var all_inputs = $('.proceed_input');
			$.each(all_inputs,function(ind,val){
				$(val).attr('readonly',true)
			})
			$('.confirm').hide();
			$('.checkoout').show();
		}
	}
	
	//order now
	var cart_products = $window.sessionStorage.getItem('uycart');
    $scope.PorductsInCart = JSON.parse(cart_products);
    console.log($scope.PorductsInCart);
  
    var totalCost = 0;
    angular.forEach($scope.PorductsInCart,function(val,index){
    	 totalCost += parseFloat(val.cost);
    	 $scope.totalCost = (totalCost).toFixed(2)
    });
    
	$scope.orderNow = function(){
    	var total_price = 0;
        angular.forEach($scope.PorductsInCart,function(val,ind){
        	total_price += (parseFloat(val.cost)).toFixed(2);
        });
        
       //process shipping details 
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
		    			total_cost		: total_price
		    		  },
    		cache 	: false,
    		headers : {'content-type': 'application/x-www-form-urlencoded'}
    		
    	}).success(function(data){
    		
    		if(data.ecommerce_checkout.status == true){
    			$window.location.href = data.ecommerce_checkout.message
    		}
    	})
    }
	
	
	
}]);
