var myApp = angular.module('teacherApp', []);
myApp.controller('tableManage', ['$scope', '$http', function($scope, $http) {

    $http.get('/clipList').success(function(response){
        console.log('$scope.list at clipslist');
        $scope.list = response;
    })

    console.log("Hello World from tableManage");
}]);



//$scope, $http) {

//$http.get('/cliplist')

//exports.appctrl = appctrl;