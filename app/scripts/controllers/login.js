'use strict';

webApp.controller('LoginCtrl', ['$scope','$http','$window','$compile','$routeParams',function ($scope,$http,$window,$compile,$routeParams) {
	$scope.error_message = '';
	$scope.login = function(){
		var isvalid = validate_form('#login_form');
		if(isvalid == true){
			var formData = $("#login_form").serializeArray();
			$http({
				url 	: sp['client_login'],
				data	: formData,
				method	: 'POST',
				cache 	: false,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
				
			}).success(function(data,status){
				if(data.client_login.status == 'success'){
					$window.sessionStorage.setItem('loginDetails',JSON.stringify(data.client_login.loggeduser));
					var user_data = data.client_login.loggeduser;
					var user_personal_data = JSON.parse(user_data.Client.details);
					var html = '<span>Welcome <a data-ng-href="/#/profile">'+ user_personal_data.first_name+' '+user_personal_data.last_name + '</a></span> | <span><a data-ng-href="/#/shop/shoping_history">History</a></span> | <span><a data-ng-href="/#/logout">Logout</a><span>';
					
					$('#login-register-block').html($compile(html)($scope));
					console.log($routeParams.redirect)
					if($routeParams.redirect == 'proceed'){
						$window.location.href = '/#/shop/proceed';
					}else{
						$window.location.href = '/#/';
					}
					
				}else{
					$scope.error_status = true;
					$scope.error_message = data.client_login.message;
				}
			}).error(function(data,status){
				$scope.error_message = 'Network Failure, Please try again.';
			});
		}
	}
  }]);
