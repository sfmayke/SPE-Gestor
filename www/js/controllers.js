angular.module('app.controllers', [])
  
.controller('mainCtrl', ['$scope', '$stateParams', '$ionicLoading', 'BlankService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, BlankService) { 
    console.log(BlankService.getObject())
    $scope.text = "asd";   
    $scope.show = function() {
        $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>',
        duration: 3000
    }).then(function(){        
        console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
        })
    }
}])
   
.controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('notificacoesCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', 'BlankService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicLoading, BlankService) {    
    $scope.user = []; 
    $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>',       
    });
     $http({
       method: 'GET',
       url: 'http://mobile-aceite.tcu.gov.br/nossaEscolaRS/rest/escolas/11001399'       
    }).then(function (success){ 
         $ionicLoading.hide();
         console.log(success.data); 
         BlankService.setObject(success.data);      
    },function (error){  
        $ionicLoading.hide(); 
        console.log('erro');     
    });   
}])
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    


}])
   
.controller('suporteAjudaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('quadrimestre1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('quadrimestre2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('quadrimestre3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('lOACtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('balancoGeralCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 