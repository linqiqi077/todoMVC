(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	/*angular
		.module('todo', [])
		.controller('TodoController', ['$scope', function($scope){
			
			// 数据结构
			// task 任务
			$scope.taskList = [
				// id 用于区分每一个任务
				// name 表示任务名称
				// isCompleted 表示任务是否完成
				{id: 1, name: '抽烟', isCompleted: false},
				{id: 2, name: '喝酒', isCompleted: true},
				{id: 3, name: '烫头发', isCompleted: false}
			];

			// 1 展示任务列表

		}]);*/
	angular
		.module('todo', ['todo.controller','todo.service'])

})(angular);
