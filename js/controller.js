/**
 * Created by sunShine on 2017/3/17.
 */
(function (angular) {
    angular
        .module('todo.controller',['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:status?',{
                templateUrl: './view/todo.html',
                controller : 'TodoController'
            })
        }])
        .controller('TodoController' , ['$scope','$routeParams' ,'DataService', function ( $scope, $routeParams ,DataService) {
                //01 任务列表
                $scope.taskList = DataService.getData();

                //添加任务
                //01 输入框回车出发提交事件，然后清空输入框
                /*
                 * 01 获取输入框的内容
                 * */
                //02 id值不能重复
                $scope.newTask ='';
                $scope.add = function () {
                    if($scope.newTask.trim() =='') {
                        return;
                    }
                    DataService.add($scope.newTask)
                    /*重置任务*/
                    $scope.newTask =''
                }
                //03 删除任务,把id当作参数传入remove方法，遍历数组，删除匹配的id的相关数据

                $scope.remove = function (id) {
                    DataService.remove(id);
                }

                // 04 修改任务，双击输入框切换到修改状态
                $scope.editId =0;
                $scope.edit = function (id) {
                    $scope.editId = id;
                }
                /*表单的submit事件，让表单提交，失去编辑状态*/
                $scope.update = function () {
                    $scope.editId = 0;
                    DataService.save();
                }

                //05 修改选中状态（单个和全部）
                //全选：方法1：根据复选框的状态来确定是否全选
                //全选：方法2： 监视全选按钮的状态，有变化就改变子的状态
                $scope.saveData = function () {
                    DataService.save();
                    $scope.selectAll = DataService.isCheckAll();
                }
                $scope.selectAll = DataService.isCheckAll();
                //方法1：
                $scope.checkAll = function () {
                    DataService.checkAll( $scope.selectAll )
                    DataService.save();
                }
                //方法2：
                /*$scope.$watch('selectAll', function (newValue) {
                 for(var i= 0;i < $scope.taskList.length;i++) {
                 $scope.taskList[i].isCompleted = newValue;
                 }
                 })*/

                //06 清除已完成任务
                //思路：保留未完成的任务
                $scope.clear = function () {
                    DataService.clear();
                }

                //07 控制清除按钮的显示与隐藏,ng-show这个指令会在数据发生变化的时候会自动执行；
                $scope.isShow = function () {

                    return DataService.isShow();
                    DataService.save()
                }

                //08 显示未完成的数据，遍历数组，判断isCompleted属性
                $scope.getUncompleted = function () {
                   return DataService.getUncompleted();
                    DataService.save();
                }

                //09 显示不同任务的状态
                /*$scope.status = undefined;
                 $scope.changeStatus = function () {
                 $scope.status = undefined;
                 };
                 $scope.changeActive = function () {
                 $scope.status = false;
                 };
                 $scope.changeCompleted = function () {
                 $scope.status = true;
                 };*/

                // 10 根据url的变化来不同的状态的变化
                // angular 提供了一个$location.url()来监视hash 值的变化
               /* $scope.location = $location;
                $scope.$watch('location.url()', function (newValue) {
                    switch (newValue){
                        case '/active':$scope.status = false;
                            break;
                        case '/completed':$scope.status = true;
                            break;
                        default:$scope.status = undefined;
                    }

                })*/
            switch($routeParams.status) {
                case 'active':
                    $scope.status = false;
                    break;
                case 'completed':
                    $scope.status = true;
                    break;
                default:
                    $scope.status = undefined;
            }
        }])
})(angular)