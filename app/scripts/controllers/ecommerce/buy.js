'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopBuyCtrl',['$scope','$http','$sce','$routeParams','$window','$route', function ($scope,$http,$sce,$routeParams,$window,$route) {
	var cart_products = JSON.parse($window.sessionStorage.getItem('uycart'));
	var cartItems = new Object();
	$.each(cart_products,function(ind,val){
		val.normalPrice = parseFloat(val.cost).toFixed(2);
		val.totalDiscount = parseFloat(val.discount[2].finalDiscount).toFixed(2);
		val.cost = (parseFloat(val.normalPrice - val.totalDiscount)).toFixed(2);
		cartItems[ind] = val;
	})
	
	/*
	 * 
	 * 
	 * 
	 * val.quantity = current_quantity;
			val.normalPrice = parseFloat(new_total).toFixed(2);
			val.totalDiscount = parseFloat(totalDiscount).toFixed(2);
			val.cost = (parseFloat(val.normalPrice - val.totalDiscount)).toFixed(2);
	 * 
	 * 
	 * 
	 */
    $scope.PorductsInCart = cartItems;
   
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
    
    //discounts
     var discountData = new Object();
     $scope.discounts = function(data,returnType){
    	var quantity = data.quantity;
    	var unitPrice = data.unitPrice;
    	var discount = data.discount;
    	if(discount[0].type == 'fixed'){
    		discountData.unitDiscount =  parseFloat(discount[1].amount).toFixed(2);
    		discountData.totalDiscount = parseFloat(discount[1].amount*quantity).toFixed(2);
    	}else if(discount[0].type == 'percentage'){
    		discountData.unitDiscount =  parseFloat((parseFloat(unitPrice) * parseFloat(discount[1].amount))/100).toFixed(2);
    		discountData.totalDiscount = parseFloat(((parseFloat(unitPrice) * parseFloat(discount[1].amount))/100) * quantity).toFixed(2)
    	}else{
    		discountData.unitDiscount =  0;
    		discountData.totalDiscount = 0;
    	}
    	
    	if(returnType == 'unit'){
    		return discountData.unitDiscount;
    	}else{
    		return discountData.totalDiscount;
    	}
    }
     
     
     //total discount 
     $scope.totalDiscounctCalculator = function(){
    		var totalDiscount = 0;
    		$.each($('.discount'),function(ind,val){
    			totalDiscount += parseFloat($(val).text());
    		});
    		return parseFloat(totalDiscount).toFixed(2);
    	}
     
     //subtotal
     $scope.subTotal = function(cost,discount){
    	 return (parseFloat(cost - discount)).toFixed(2);
     }
     
     
     //grunt total
     $scope.grantTotal= function(){
    	 var totalCost = $('.total_cost').text();
    	 var totalDiscount = $('.total_discount').text();
    	 return (parseFloat(parseFloat(totalCost) - parseFloat(totalDiscount))).toFixed(2);
    	 
     }
}]);

var updatePrice = function(dom){
	
	var current_quantity = $(dom).val();
	var unit_price = $(dom).attr('data-unitPrice');
	var unitDiscount = $(dom).attr('data-unitDiscount');
	var totalDiscount = parseFloat(unitDiscount*current_quantity).toFixed(2);
	var new_total = parseFloat(current_quantity * parseFloat(unit_price).toFixed(2)).toFixed(2);;
	$($(dom).closest('td').next('td')).html(new_total);
	$($(dom).closest('td').next('td').next('td')).html(totalDiscount);
	
	//update cart
	var updated_index = $(dom).attr('data-cartIndex');
	var currnet_cart = JSON.parse(window.sessionStorage.getItem('uycart'));
	var new_cart  = new Array();
	$.each(currnet_cart, function(index,val){
		if(index == updated_index){
			val.quantity = current_quantity;
			val.normalPrice = parseFloat(new_total).toFixed(2);
			val.totalDiscount = parseFloat(totalDiscount).toFixed(2);
			val.cost = (parseFloat(val.normalPrice - val.totalDiscount)).toFixed(2);
			$($(dom).closest('td').next('td').next('td').next('td')).html(val.cost);
			new_cart.push(val)
		}else{
			new_cart.push(val)
		}
	});
	
	window.sessionStorage.setItem('uycart',JSON.stringify(new_cart));
	
	
	//total cost for all products
	var total_normal_cart_cost = 0;
	angular.forEach(new_cart,function(val,index){
		total_normal_cart_cost += parseFloat(val.normalPrice)
	})
	
	//total discount
	$('.total_discount').html(totalDiscounctCalculator())
	
	//total cost
	$('.total_cost').html(parseFloat(total_normal_cart_cost).toFixed(2));
	
	//grant Total
	$('.grantTotal').html(grantTotalCalculator());
	
}

var totalDiscounctCalculator = function(){
	var totalDiscount = 0;
	$.each($('.discount'),function(ind,val){
		totalDiscount += parseFloat($(val).text());
	});
	return parseFloat(totalDiscount).toFixed(2);
}

var grantTotalCalculator = function(){
	 var totalCost = $('.total_cost').text();
	 var totalDiscount = $('.total_discount').text();
	 return (parseFloat(parseFloat(totalCost) - parseFloat(totalDiscount))).toFixed(2);
}



