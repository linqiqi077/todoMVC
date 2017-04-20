/**
 * Created by sunShine on 2017/3/17.
 */
(function (angular) {
    angular
        .module('todo.service',[])
        .service('DataService',['$window', function ($window) {
            //01 ʵ�ֻ�ȡ���ݵĲ���
            var localStorage = $window.localStorage;
            var taskList = JSON.parse( localStorage.getItem('todo') )|| [];

            this.getData = function () {
                return taskList;
            };
            this.save = function () {
                localStorage.setItem('todo',JSON.stringify(taskList))
            }
            // 02 �������
            this.add = function (newTask) {
                var id;
                if(taskList.length==0){
                    id =1;
                }else {
                    var index=taskList.length-1;
                    id  = taskList[index].id+1;
                }
                taskList.push({id:id, name:newTask, isCompleted:false})
                this.save();
            };

            // 03 ɾ������
            this.remove = function (id) {
                for(var i= 0;i <taskList.length;i++) {
                    if(taskList[i].id === id) {
                        taskList.splice(i,1);
                        break;
                    }
                }
                this.save();
            }

            //05 �޸�ѡ��״̬
            // 5.2 ����ȫѡ״̬
            this.checkAll = function (selectAll) {
                for(var i= 0;i < taskList.length;i++) {
                    taskList[i].isCompleted =selectAll ;
                }
            }

            //06 ������������
            this.clear = function () {
                var temp =[];
                for(var i= 0;i < taskList.length;i++) {
                    var task = taskList[i];
                    if(!task.isCompleted) {
                        temp.push(task)
                    }
                }
                taskList.length = 0;
                [].push.apply(taskList, temp);
                this.save();
            }

            //07 ���������ť����ʾ������
            this.isShow = function () {
                var flag =false;
                for(var i= 0;i < taskList.length;i++) {
                    var task = taskList[i];
                    if(task.isCompleted) {
                        flag =true;
                        break
                    }
                }
                return flag;
            }

            //08 ��ʾδ��ɵ����ݣ��������飬�ж�isCompleted����
            this.getUncompleted = function () {
                var count = 0;
                taskList.forEach(function (task) {
                    if(!task.isCompleted) {
                        count ++ ;
                    }
                })
                return count;
            }
            // 09 ��ȫȫѡ��ť��״̬�ж�
            this.isCheckAll = function () {
                var isChecked = true;
                taskList.every(function (task) {
                    if(!task.isCompleted) {
                        isChecked = false;
                        return false;
                    }
                    return true;
                })
                return isChecked;
            }
        }])
})(angular)