'use strict';

webApp.controller('RegisterCtrl',['$scope','$http', function ($scope,$http) {
	$scope.error_message = '';
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
			}).success(function(data,status){
				$scope.error_message = data.register_client.message;
			}).error(function(data,status){
				$scope.error_message = "Network error,please refresh your page."
			});
		}
	}
  }]);
