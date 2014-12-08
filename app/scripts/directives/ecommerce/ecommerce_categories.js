'use strict';
webApp.directive('ecommercecategories',['$rootScope','$http','$compile','$sce', function ($scope,$http,$compile,$sce) {
	$scope.ecommerce_cat_loading = true;
	
	//tree generator
	var treeGenerator = function(threaded) {
		
		if((threaded.length)>0){
			var html = '<ul>';
			angular.forEach(threaded,function(node,key) {
				html += '<li>';
				angular.forEach (node,function(threaded,type) {
					if (type !== 'children') {
						html +=  "<a data-ng-href='/#/shop/category_view/"+threaded.id+"'>"+threaded.title+'</a>'
					} else {
						if ((threaded.length)>0) {
							html += treeGenerator(threaded);
						}
					}
				})
				html += '</li>';
			})
			html += '</ul>';
			
			return html;
		}
	}
	
	$http({
		url		: sp['shop_category_tree'],
		method 	: 'get',
		cache 	: true,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data){
		//$scope.ecommerce_categories = data.ecommerce_categories;
		$scope.ecommerce_cat_loading = false;
		$scope.error_message = '';
		$scope.categoryTree = treeGenerator(data.category_tree)
				
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/ecommerce/ecommerce_categories.html',
		link : function(scope, element, atttributes){
			$http({
				url		: sp['shop_category_tree'],
				method 	: 'get',
				cache 	: true,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.ecommerce_cat_loading = false;
				$scope.error_message = '';
				$scope.categoryTree = treeGenerator(data.category_tree);
						
			}).error(function(status){
				$scope.error_message = 'Network Error occured. Please reload page.';
			});
			
			
			scope.$watch('categoryTree',function(nv,ov){
				if(nv != ov){
					$scope.categoryTree = $compile(nv) (scope);
					$('.categoryTreeUl').html($scope.categoryTree )
					//$scope.categoryTree = htmlString($scope.categoryTree);
					//console.log($scope.categoryTree)
				}
			})
		},
		
		    
	};
	
	
	
	
	
	
  }]);
