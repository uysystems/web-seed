'use strict';
webApp.directive('ecommercecategories',['$rootScope','$http','$compile','$sce', function ($scope,$http,$compile,$sce) {
	return {
		restrict: 'E',
		transclude: true,
		controller : function(){
			$scope.ecommerce_cat_loading = true;
			$http({
				url		: sp['shop_category_tree'],
				method 	: 'get',
				cache 	: true,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.ecommerce_cat_loading = false;
				$scope.error_message = '';
				$scope.categoryTreeData = data.category_tree;
			}).error(function(status){
				$scope.error_message = 'Network Error occured. Please reload page.';
			});
			$scope.$watch('categoryTreeData',function(nv,ov){
				$scope.categoryTree = nv;
			});
		},
		templateUrl : 'views/directives/ecommerce/ecommerce_categories.html'
	};
  }]);

//tree generator
/*
$scope.treeGenerator = function(threaded) {
	if((threaded.length)>0){
		var html = '<ul>';
		$.each(threaded,function(key,node) {
			html += '<li>';
			$.each(node,function(type,threaded) {
				if (type !== 'children') {
					html +=  "<a data-ng-href='/#/shop/category_view/"+threaded.id+"'>"+threaded.title+'</a>'
				} else {
					if ((threaded.length)>0) {
						html += $scope.treeGenerator(threaded);
					}
				}
			})
			html += '</li>';
		})
		html += '</ul>';
		
		return html;
	}
}
*/
//
