var myApp = angular.module('cardsApp', []);
myApp.controller('tableManage', ['$scope', '$http', function($scope, $http) {

    $http.get('/api/listallcards').success(function(response){
        console.log('$scope.list at cardslist');
        $scope.list = response;
    })

    console.log("Hello World from cards app angular");
}]);

config(function ($routeProvider){

})