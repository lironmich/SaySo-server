var myApp = angular.module('teacherApp', []);
myApp.controller('tableManage', ['$scope', '$http', function($scope, $http) {

    $http.get('/dbapi/movies').success(function(response){
        console.log('$scope.list at getMovies ');
        $scope.movielist = response;
    })

    console.log("Hello World from tableManage");
}]);



//$scope, $http) {

//$http.get('/cliplist')

//exports.appctrl = appctrl;