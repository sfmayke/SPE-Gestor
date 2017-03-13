angular.module('app.controllers', [])

    .controller('mainCtrl', ['$scope', '$stateParams', '$ionicLoading', 'UsuarioFactory', 'ListaFactory', 'CompetenciaFactory', '$http', 'UsuarioService', 'ExercicioService', 'ListaService', '$location', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicLoading, UsuarioFactory, ListaFactory, CompetenciaFactory, $http, UsuarioService, ExercicioService, ListaService, $location, $state) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.contador = 2;
            $scope.date = new Date().getUTCFullYear();
            $scope.exercicio = {}

            UsuarioFactory.getUsuario().then(function(success){
                $scope.user = UsuarioService.getObject();
                ListaFactory.getLista().then(function(success){
                    $scope.exercicio.lista = ExercicioService.getObject();
                    $scope.funcao($scope.date.toString());
                    $scope.exercicio.opcoes = ExercicioService.getSelectedAno();
                    $ionicLoading.hide();                    
                });
            });            

            $scope.funcao = function (ano) {
                $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
                ExercicioService.setSelectedAno(ano);
                CompetenciaFactory.getCompetencia(ExercicioService.getSelectedAno()).then(function(success){
                    ListaService.setObject(success);
                    $scope.competencia = ListaService.getObject();
                    $ionicLoading.hide();
                });            
            }
        }])

    .controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('notificacoesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {

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

    .controller('quadrimestre1Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory) {
           $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });            
            OrgaoFactory.getOrgao('1')
                .then(function(success) {
                    $ionicLoading.hide();                    
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();    
                    $scope.municipio = success;                
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
             });
        }])

    .controller('quadrimestre2Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory) {
           $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });            
            OrgaoFactory.getOrgao('2')
                .then(function(success) {
                    $ionicLoading.hide();                    
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();    
                    $scope.municipio = success;                
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
             });
        }])

    .controller('quadrimestre3Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory) {
           $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });            
            OrgaoFactory.getOrgao('3')
                .then(function(success) {
                    $ionicLoading.hide();                    
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();    
                    $scope.municipio = success;                
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
             });
        }])

    .controller('lOACtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });            
            OrgaoFactory.getOrgao('901')
                .then(function(success) {
                    $ionicLoading.hide();                    
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();    
                    $scope.municipio = success;                
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
             });
        }])

    .controller('balancoGeralCtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });            
            OrgaoFactory.getOrgao('999')
                .then(function(success) {
                    $ionicLoading.hide();                    
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();    
                    $scope.municipio = success;                
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
             });

        }])