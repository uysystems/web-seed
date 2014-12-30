'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.controller('ShopProductDetailsCtrl',['$scope','$http','$sce', '$routeParams','$window','$route','$compile',function ($scope,$http,$sce,$routeParams,$window,$route,$compile) {
   $scope.shop_image_location = sp['product_image_root'];
   
   $scope.shop_product_details_loading = true;
	
	//get product data data
	$http({
		method 	: 'post',
		url		: sp['shop_product_details'],
		data	: {productId : $routeParams.id},
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		//get initial data according to the product type
		$http({
			method	: 'post',
			url 	: sp['shop_product_attributes'],
			data	: {type_id : data.ecommerce_product_details[0].Product.type_id},
			cache 	: false,
			headers : {'content-type': 'application/x-www-form-urlencoded'}
		}).success(function(attribute_data){
			//assign values
			$scope.AllAttributeByType = attribute_data.ecommerce_product_attributes;
			$scope.shop_product_details = data.ecommerce_product_details;
			$scope.product_base_price = $scope.shop_product_details[0].Product.price;
			$scope.product_price = parseFloat($scope.product_base_price,2);
			$scope.quantity = 1;
			
			$scope.shop_product_details_loading = false;
			$scope.error_message = '';
		}).error(function(attribute_error){
			$scope.error_message = 'Network Error occured. Please reload page.';
		})
		
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	
	$scope.textToSafeHtml = function(data) {
		return $sce.trustAsHtml(data);
	}
	
	//gallery image change
	$scope.updateThumb = function($event){
		$('.current_image').attr('src',$($event.target).attr('src')); 
	}
	
	//
	
	$scope.uyZoom = function($event){
		//cursor
		var cursor = new Object();
		cursor.x = $event.clientX;
		cursor.y = $event.clientY;
		var img_data = getImagePosition($($event.target))
		
		$('.uy-zoomer').remove();
		//$($event.target).parent().css({'position':'relative'});
		$($event.target).parent().append(zoomView(img_data));
	}
	
	$scope.destroyZoom = function(){
		$('.uy-zoomer').remove();
	}
	
	var getImagePosition = function(image_dom){
		var image_data = new Object();
		image_data.width = image_dom.width();
		image_data.height = image_dom.height();
		image_data.offsectPosition = image_dom.offset();
		image_data.Y0 = parseFloat(image_data.offsectPosition.top) + parseFloat(image_data.height);
		image_data.X0 = image_data.offsectPosition.left;
		image_data.url = image_dom.attr('src');
		
		return image_data;
	}
	
	var zoomView = function(image){
		var cur_pos_X = parseFloat(image.width) ;
		var cur_pos_Y = 0;
		var view_div = "<div class='uy-zoomer' style='position:absolute;z-index:999; border: 1px solid red; top:"+cur_pos_Y+"px;left:"+cur_pos_X+"px; width: 300px; height:300px;'></div>"
		return view_div;//console.log(view_div)
	}
	
	//update price by attribute values
	$scope.updateAditionalPrice = function(type){
		if(type == 'yes'){
			var base_price = $scope.product_base_price;
			var all_attr_values = $('.attribute-value-for-additional-price');
			var additional_price = 0;
			$.each(all_attr_values, function(){
				if ($(this).is(':checked') == true){
					additional_price += parseFloat($(this).attr('data-additional-price'));
				};
			});
			var final_unit_price =parseFloat(base_price,2) + additional_price;
			$scope.product_price = parseFloat($scope.quantity * final_unit_price,2);
		}
	}
	// add to cart
	$scope.uycart;
	$scope.addToCart = function($event){
		//animate
		var cart = $('.productNoInCart');
			var imgtodrag = $('.current_image');
			if (imgtodrag) {
			    var imgclone = imgtodrag.clone()
			        .offset({
			        top: imgtodrag.offset().top,
			        left: imgtodrag.offset().left
			    }).css({
			        'opacity': '0.5',
			            'position': 'absolute',
			            'height': '150px',
			            'width': '150px',
			            'z-index': '100'
			    }).appendTo($('body'))
			        .animate({
			        'top': cart.offset().top + 10,
			            'left': cart.offset().left + 10,
			            'width': 75,
			            'height': 75
			    }, 500);
			    imgclone.animate({
			        'width': 0,
			            'height': 0
			    }, function () {
			        $(this).detach()
			    });
			}
		//process new item
		
		var new_cart_item =$($event.target).serializeArray();
		var new_cart_item_data = new Object();
		new_cart_item_data.attributes = new Object();
		$.each(new_cart_item,function(ind,val){
			//get attribute
			var is_attribe = val['name'].split('.');
			if(is_attribe[0]=='attribute'){
				new_cart_item_data.attributes[is_attribe[1]] = val['value']
			}else{
				new_cart_item_data[val['name']] = val['value'] ;
			}
		})
		
		new_cart_item_data['unitPrice'] = new_cart_item_data['cost'] / new_cart_item_data['quantity'];
		new_cart_item_data['discount'] = $scope.shop_product_details[0].Product.options.discount;
		new_cart_item_data['productCode'] = $scope.shop_product_details[0].Product.product_code;
		
		//
		
		
		
		var current_cart = $window.sessionStorage.getItem('uycart');
		var new_cart = new Array();
		
		if(current_cart == null){
			new_cart[0] = new_cart_item_data;
			$window.sessionStorage.setItem('uycart',JSON.stringify(new_cart));
		}else{
			current_cart = JSON.parse(current_cart);
			current_cart[current_cart.length] = new_cart_item_data;
			$window.sessionStorage.setItem('uycart',JSON.stringify(current_cart));
		}
		$scope.uycart = $window.sessionStorage.getItem('uycart');
	}
	
	//process cart dom
	var processDomForCart = function(){
		var cart_data = JSON.parse($window.sessionStorage.getItem('uycart'));
		$('.productNoInCart').html(cart_data.length+' items')
		var total_value = 0;
		var cartHtml ='';
		$.each(cart_data,function(ind,val){
			total_value += parseFloat(val.cost,2);
		});
		$('.totalPriceInCart').html('$'+total_value)
	}
	
	$scope.$watch('uycart',function(nv,ov){
		if(nv != ov){
			processDomForCart()
		}
	})
}]);
