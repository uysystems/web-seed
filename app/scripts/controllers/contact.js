'use strict';

webApp.controller('ContactCtrl', ['$scope','$http',function ($scope,$http) {
	
	
	//generate map
	loadScript()
	
	$http({
		method 	: 'get',
		url		: sp['shop_stores'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.storeList = data.ecommerce_stores;
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
}]);

function loadScript() {
	mapInitialize()
}	

function mapInitialize(){
	$.ajax({
		url : sp['shop_stores'],
		beforeSend : function(){
			$('#google-map').html('<img style="margin-left : 50%; margin-top :30px;" src="images/ajax-loader.gif">');
		},
		success : function(msg){
			var stores = msg.ecommerce_stores;
			
			var center_store_no = parseInt(stores.length/2);
			
			var map_center = new google.maps.LatLng(stores[center_store_no].Store.latitude, stores[center_store_no].Store.longitude);

			var mapOptions = {
		  	    zoom: 12,
		  	    center: map_center
		  	  };
			
			var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
			//markers
			var marker = new Array();
			var infoWindow = new Array();
			$.each(stores,function(index,val){
				marker[index] = new google.maps.Marker({
		  	      position: new google.maps.LatLng(val.Store.latitude, val.Store.longitude),
		  	      map: map,
		  	      //icon: 'img/timeout/baloon.png',
		  	      title : val.Store.title
		  	  });

			 //INFO WINDOW
			 infoWindow[index] = new google.maps.InfoWindow({
			      content: "&lt;strong&gt;"+val.Store.title+"&lt;/strong&gt;&lt;br&gt;"+ val.Store.details
			  });

			//INFO WINDOW EVENT LISTNER
			 google.maps.event.addListener(marker[index], 'click', function() {
				 infoWindow[index].open(map,marker[index]);
			 });

			});
			
			 
		}
		
	})	
}
