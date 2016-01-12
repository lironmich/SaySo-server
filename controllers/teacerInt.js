var myApp = angular.module('teacherApp', []);
myApp.controller('tableManage', ['$scope', '$http', function($scope, $http) {
    debugger;
    var list = [{
        name : "movie1",
        provider : "movie2",
        link : "url//blala",
    },
        {
            name : "movie2222",
            provider : "movie222222222",
            link : "url//blalablalablala",
        }];
    $scope.list = list;
    console.log("Hello World from tableManage");
}]);



//$scope, $http) {

//$http.get('/cliplist')

//exports.appctrl = appctrl;