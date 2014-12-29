'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopBuyCtrl',['$scope','$http','$sce','$routeParams','$window','$route', function ($scope,$http,$sce,$routeParams,$window,$route) {
	var cart_products = $window.sessionStorage.getItem('uycart');
    $scope.PorductsInCart = JSON.parse(cart_products);
   
    /*$scope.totalCost = 0;
    angular.forEach($scope.PorductsInCart,function(val,index){
    	 $scope.totalCost += parseFloat(val.cost).toFixed(2);
    });
    */
    
    //remove from cart
    $scope.removeFromCart = function(item_no){
    	var current_cart = $window.sessionStorage.getItem('uycart');
		var new_cart = new Array();
		current_cart = JSON.parse(current_cart);
		$.each(current_cart,function(ind,val){
			
			if(ind != item_no){
				new_cart.push(val)
			}
		})
		$window.sessionStorage.setItem('uycart',JSON.stringify(new_cart));
		//set new cart
		$scope.PorductsInCart = JSON.parse($window.sessionStorage.getItem('uycart'));
		//process new view
		if(window.sessionStorage.getItem('uycart') != null){
			var cart_data = JSON.parse($window.sessionStorage.getItem('uycart'));
			$('.productNoInCart').html(cart_data.length+' items')
			var total_value = 0;
			$.each(cart_data,function(ind,val){
				total_value += parseFloat(val.cost).toFixed(2);
			});
			$('.totalPriceInCart').html('$'+total_value)
		}
    	
    }
    
    //watch cart items
    $scope.$watch('PorductsInCart',function(nv,ov){
    	$scope.totalCost = 0;
        angular.forEach($scope.PorductsInCart,function(val,index){
        	 $scope.totalCost += parseFloat(val.cost);
        	
        });
        
        $scope.totalCost = parseFloat($scope.totalCost).toFixed(2);
    });
    
    //
    $scope.discounts = function(data){
    	var quantity = data.quantity;
    	var unitPrice = data.unitPrice;
    	var discount = data.discount;
    	if(discount[0].type = 'fixed'){
    		var totalDiscount = parseFloat(discount[1].amount*quantity).toFixed(2)
    	}else if(discount[0].type = 'percentage'){
    			var totalDiscount = parseFloat(((parseFloat(unitPrice) * parseFloat(discount[1].amount))/100) * quantity).toFixed(2)
    	}
    	return totalDiscount;
    }
  
    
}]);

var updatePrice = function(dom){
	var current_quantity = $(dom).val();
	var unit_price = $(dom).attr('data-unitPrice')
	var new_total = parseFloat(current_quantity * parseFloat(unit_price).toFixed(2)).toFixed(2);;
	$($(dom).closest('td').next('td')).html(new_total+" EUR");
	
	//update cart
	var updated_index = $(dom).attr('data-cartIndex');
	var currnet_cart = JSON.parse(window.sessionStorage.getItem('uycart'));
	var new_cart  = new Array();
	$.each(currnet_cart, function(index,val){
		if(index == updated_index){
			val.quantity = current_quantity;
			val.cost = parseFloat(new_total).toFixed(2);
			new_cart.push(val)
		}else{
			new_cart.push(val)
		}
	});
	
	window.sessionStorage.setItem('uycart',JSON.stringify(new_cart));
	
	
	//total cost for all products
	var total_cart_cost = 0;
	angular.forEach(new_cart,function(val,index){
		total_cart_cost += parseFloat(val.cost)
	})
	
	$('.total_cost').html(parseFloat(total_cart_cost).toFixed(2));
}


