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
                    controller: 'ElectronicsController'
                }).
                when('/Books', {
                    templateUrl: 'Templates/Books.template.html',
                    controller: 'BooksController'
                }).
                when('/Clothes', {
                    templateUrl: 'Templates/Clothes.template.html',
                    controller: 'ClothesController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        }]);


module.controller( 'loginController', function($scope,$http,$location) {
  


	
	
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

$location.path("/Electronics");
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

module.controller('ElectronicsController',function($scope){
  
  $scope.Electronics = JSON.parse(Electronics);
  
  
  
  
  
});
module.controller('BooksController',function($scope){
  
  $scope.Books = JSON.parse(Books);
  
  
  
  
  
});
module.controller('ClothesController',function($scope){
  
  $scope.Clothes = JSON.parse(Clothes);
  
  
  
  
  
});