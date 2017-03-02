angular.module('app.controllers', [])

    .controller('mainCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', 'UsuarioService', 'ExercicioService', 'ListaService', '$location', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicLoading, $http, UsuarioService, ExercicioService, ListaService, $location, $state) {
            $ionicLoading.show({
                template: '<ion-spinner icon="lines"></ion-spinner>',
            });
            $scope.contador = 2;
            $scope.date = new Date().getUTCFullYear();
            $scope.exercicio = {}
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-dados-usuario?imei=357798072306630',
            }).then(function (success) {
                UsuarioService.setObject(success.data[0]);
                $scope.user = UsuarioService.getObject();
                $scope.contador--;
                if($scope.contador == 0){
                    $ionicLoading.hide();
                }                
            });

            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-lista-competencia',
            }).then(function (success) {

                ExercicioService.setObject(success.data);
                $scope.exercicio.lista = ExercicioService.getObject();
                $scope.contador--;
                if($scope.contador == 0){
                    $ionicLoading.hide();
                }
                $scope.funcao($scope.date.toString());
                $scope.exercicio.opcoes = ExercicioService.getSelectedAno();
            });

            $scope.funcao = function (ano) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="lines"></ion-spinner>',
                });
                ExercicioService.setSelectedAno(ano);
                $http({
                    method: 'GET',
                    url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-competencia-ano?ano=' + ExercicioService.getSelectedAno(),
                }).then(function (success) {
                    console.log(success.data[2016]);
                    ListaService.setObject(success.data[ExercicioService.getSelectedAno()]);
                    $scope.competencia = ListaService.getObject();
                    $ionicLoading.hide();
                });
            }

            $scope.teste = function(x){
                switch (x) {
                    case 'L.O.A.': $state.go('lOA');                 
                        break;                
                    default:
                        break;
                }
                               
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

    .controller('lOACtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $location) {
            console.log($location.url());

        }])

    .controller('balancoGeralCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
