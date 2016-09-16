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


module.controller( 'loginController', function($scope,$rootScope,$location) {
  
  
    $rootScope.logpage = 1;
  $rootScope.success = 0;
$rootScope.Errorpage = 1;



	
	
   $scope.validate = function(form)
{
  var obj = JSON.parse(users);
 
cond = 0;

for(i=0;i<obj.length;i++){
  




if(form.userid == obj[i].username)
{
cond = 1;
if(form.pswrd == obj[i].password)
{
$rootScope.username = obj[i].username;
$rootScope.success = 1;
$location.path("/Books");
break;

}

else
{
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
  


 

  
  $scope.Electronics = JSON.parse(Electronics);
   $scope.Books = JSON.parse(Books);
   $scope.Clothes = JSON.parse(Clothes);

  
  
});

module.controller('MainController', function($scope,$location){


$scope.total = 0;
$scope.added=[];





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
$scope.len = $scope.added.length
$scope.Tax = $scope.total*0.1;
$scope.amt = $scope.Tax + $scope.total;

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



});



