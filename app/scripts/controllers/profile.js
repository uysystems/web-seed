'use strict';

webApp.controller('ProfileCtrl', ['$rootScope', '$scope','$window','$http',function ($rootScope,$scope,$window,$http) {
	var logged_user = $window.sessionStorage.getItem('loginDetails');
	if(logged_user == null){
		$window.location.href="/#/"
	}else{
		var logged_user_data = JSON.parse(logged_user);
	}
	
	//get profile data
	
	$http({
		url 	: sp['client_profile'],
		data	: {client_id : logged_user_data.Client.id , action : 'get_data'},
		method	: 'POST',
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data,status){
		$scope.profile_data = data.client_profile.Client;
		$scope.profile_details = JSON.parse($scope.profile_data.details)
	}).error(function(data,status){
		$scope.error_message = "Network error,please refresh your page."
	});
	
	
	//submit new profile	
	$scope.updateProfile = function(){
		var isvalid = validate_form('#update_profile_form');
		
		if(isvalid == true){
			var formData = $("#update_profile_form").serializeArray();
			$http({
				url 	: sp['client_profile'],
				data	: {client_id : logged_user_data.Client.id , action : 'upate_data',new_data : formData},
				method	: 'POST',
				cache 	: false,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
			}).success(function(data,status){
				$('#profile_update_message').html(data.client_profile_update.message);
			}).error(function(data,status){
				$('#profile_update_message').html('Please try Again.');
			});
		}
	}
	
	$scope.checkCurrentPassword = function(){
		$http({
			url 	: sp['client_check_crrrent_password'],
			data	: {client_id : logged_user_data.Client.id , current_password : $scope.current_password},
			method	: 'POST',
			cache 	: false,
			headers : {'content-type': 'application/x-www-form-urlencoded'}
		}).success(function(data,status){
			$('#current_password_is_matched').html(data.client_password_check.message);
			if(data.client_password_check.message == ''){
				$('#current_password_is_matched').attr('is_matched','matched');
			}else{
				$('#current_password_is_matched').attr('is_matched','notMatched');
			}
			
			
		})
	}
	
	///submit new password
	
	$scope.updatePassword = function(){
		var isvalid = validate_form("#update_password_form");
		if(isvalid == true){
			if($('#current_password_is_matched').attr('is_matched') == 'matched'){
				$http({
					url 	: sp['client_update_password'],
					data	: {client_id : logged_user_data.Client.id , new_password : $scope.new_password},
					method	: 'POST',
					cache 	: false,
					headers : {'content-type': 'application/x-www-form-urlencoded'}
				}).success(function(data,status){
						$('#password_update_message').html(data.client_update_password.message);
					
				}).error(function(){
					$('#password_update_message').html('Network error, please try again');
				})
			}
			
		}
	}
	
	
	
		
	
  }]);
