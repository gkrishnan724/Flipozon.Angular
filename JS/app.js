var module = angular.module("sampleApp", ['ngRoute']);

    module.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/login', {
                    templateUrl: 'Templates/login.template.html',
                    controller: 'loginController'
                }).
                when('/Electronics', {
                    templateUrl: 'Templates/Electronics.template.html',
                    controller: 'JSONController'
                }).
                when('/Books', {
                    templateUrl: 'Templates/Books.template.html',
                    controller: 'JSONController'
                }).
                when('/Clothes', {
                    templateUrl: 'Templates/Clothes.template.html',
                    controller: 'JSONController'
                }).
                when('/Error', {
                    templateUrl: 'Templates/Error.template.html',
                    controller: 'JSONController'
                }).
                when('/Bill', {
                    templateUrl: 'Templates/Bill.template.html',
                    controller: 'JSONController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        }]);


module.controller( 'loginController', function($scope,$rootScope,$location,$http) {

    $http.get('JS/data.json').then(function(response){
        $rootScope.users = response.data.users;
        $rootScope.Books = response.data.Books;
        $rootScope.Clothes = response.data.Clothes;
        $rootScope.Electronics = response.data.Electronics;
        console.log($rootScope.users);
    });

    $rootScope.logpage = 1;
    $rootScope.success = 0;
    $rootScope.Errorpage = 1;
    $scope.validate = function(form) {
       var obj = $rootScope.users;
        cond = 0;
        for(i=0;i<obj.length;i++){
            if(form.userid == obj[i].username) {
                cond = 1;

                if(form.pswrd == obj[i].password) {
                    $rootScope.username = obj[i].username;
                    $rootScope.success = 1;
                    $location.path("/Books");
                    break;
                }
                else {
                    alert("Incorrect Password");
                    break;
                }
            }
        }
        if(cond == 0){
            alert("Incorrect Credentials");
        }
    }
});

module.controller('JSONController',function($scope,$rootScope,$location){
    $rootScope.logpage = 0;
    $rootScope.Errorpage = 0;
    if($rootScope.success == 0){

        $location.path("/Error");
        $rootScope.Errorpage = 1;
        $rootScope.logpage = 1;
};
    var currentpage = $location.path();
    if(currentpage == "/Bill" && $rootScope.success == 1){
        $rootScope.Errorpage = 1;
        $rootScope.logpage = 1;

    };

});

module.controller('MainController', function($scope,$location){

    $scope.total = 0;
    $scope.added=[];
    $scope.array = [];
    currentpage = $location.path();
    console.log(currentpage);

    $scope.AddItem = function(name,price){
        var value = parseFloat(price);
        var cart = {
            name: name,
            price: value

        };

        $scope.total = $scope.total + value;
        $scope.added.push(cart);
        $scope.array  = $scope.added;
        $scope.len = $scope.added.length
        $scope.Tax = $scope.total*0.1;
        $scope.amt = $scope.Tax + $scope.total;
        $scope.Billtotal = $scope.amt;
        console.log($scope.amt);
    };


    $scope.clear = function(){

        $scope.added = [];
        $scope.total = 0;
        $scope.len = $scope.added.length
        $scope.Tax = 0;
        $scope.amt = 0;
    };

    $scope.Bill = function(){

        $location.path("/Bill");
        $('#checkoutModal').modal('hide');
        $scope.added = [];
        $scope.total = 0;
        $scope.len = $scope.added.length
    };

    $scope.logout = function(){

        $scope.added = [];
        $scope.total = 0;
        $scope.len = $scope.added.length
        $scope.Tax = 0;
        $scope.amt = 0;
        $rootScope.success = 0;
    };

    $scope.DelItem = function(item){
        for(var i=0;i<$scope.added.length;i++) {
            if (item.name == $scope.added[i].name) {
                var value = parseFloat(item.price)
                $scope.added.splice(i, 1);
                console.log($scope.added);
                $scope.total = $scope.total - value;
                $scope.Tax = $scope.total * 0.1;
                $scope.amt = $scope.Tax + $scope.total;
            }
        }
        $scope.array = $scope.added;
        $scope.Billtotal  = $scope.amt;
    };
});



