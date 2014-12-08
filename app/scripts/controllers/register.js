'use strict';

webApp.controller('RegisterCtrl',['$scope','$http', function ($scope,$http) {
	$scope.messageFlag = false;
	$scope.register = function(){
		var isvalid = validate_form('#registraion_form');
		if(isvalid == true){
			var formData = $("#registraion_form").serializeArray();
			$http({
				url 	: sp['client_registration'],
				data	: formData,
				method	: 'POST',
				cache 	: false,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				
				if(data.register_client.status == 'success'){
					$scope.messageStatus = 'success';
				}else{
					$scope.messageStatus = 'danger';
				}
				$scope.message = data.register_client.message;
				
			}).error(function(data){
				$scope.messageStatus = 'warning';
				$scope.message = "Network error,please refresh your page."
			});
				//set message
				$scope.messageFlag = true;
		}
	}
  }]);
