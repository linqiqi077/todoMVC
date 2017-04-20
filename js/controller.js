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
                //01 �����б�
                $scope.taskList = DataService.getData();

                //�������
                //01 �����س������ύ�¼���Ȼ����������
                /*
                 * 01 ��ȡ����������
                 * */
                //02 idֵ�����ظ�
                $scope.newTask ='';
                $scope.add = function () {
                    if($scope.newTask.trim() =='') {
                        return;
                    }
                    DataService.add($scope.newTask)
                    /*��������*/
                    $scope.newTask =''
                }
                //03 ɾ������,��id������������remove�������������飬ɾ��ƥ���id���������

                $scope.remove = function (id) {
                    DataService.remove(id);
                }

                // 04 �޸�����˫��������л����޸�״̬
                $scope.editId =0;
                $scope.edit = function (id) {
                    $scope.editId = id;
                }
                /*����submit�¼����ñ��ύ��ʧȥ�༭״̬*/
                $scope.update = function () {
                    $scope.editId = 0;
                    DataService.save();
                }

                //05 �޸�ѡ��״̬��������ȫ����
                //ȫѡ������1�����ݸ�ѡ���״̬��ȷ���Ƿ�ȫѡ
                //ȫѡ������2�� ����ȫѡ��ť��״̬���б仯�͸ı��ӵ�״̬
                $scope.saveData = function () {
                    DataService.save();
                    $scope.selectAll = DataService.isCheckAll();
                }
                $scope.selectAll = DataService.isCheckAll();
                //����1��
                $scope.checkAll = function () {
                    DataService.checkAll( $scope.selectAll )
                    DataService.save();
                }
                //����2��
                /*$scope.$watch('selectAll', function (newValue) {
                 for(var i= 0;i < $scope.taskList.length;i++) {
                 $scope.taskList[i].isCompleted = newValue;
                 }
                 })*/

                //06 ������������
                //˼·������δ��ɵ�����
                $scope.clear = function () {
                    DataService.clear();
                }

                //07 ���������ť����ʾ������,ng-show���ָ��������ݷ����仯��ʱ����Զ�ִ�У�
                $scope.isShow = function () {

                    return DataService.isShow();
                    DataService.save()
                }

                //08 ��ʾδ��ɵ����ݣ��������飬�ж�isCompleted����
                $scope.getUncompleted = function () {
                   return DataService.getUncompleted();
                    DataService.save();
                }

                //09 ��ʾ��ͬ�����״̬
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

                // 10 ����url�ı仯����ͬ��״̬�ı仯
                // angular �ṩ��һ��$location.url()������hash ֵ�ı仯
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