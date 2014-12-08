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
	
	
	return {
		restrict: 'E',
		transclude: true,
		
		controller : function(){
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
		},
		
		link : function(scope, element, atttributes){
			scope.$watch('categoryTree',function(nv,ov){
				if(nv != ov){
					$scope.categoryTree = $compile(nv) (scope);
					//console.log($scope.categoryTree)
					$('.categoryTreeUl').html($scope.categoryTree)
					//$scope.categoryTree = htmlString($scope.categoryTree);
					//console.log($scope.categoryTree)
				}
			})
		},
		
		templateUrl : 'views/directives/ecommerce/ecommerce_categories.html'
		
		    
	};
	
	
	
	
	
	
  }]);
