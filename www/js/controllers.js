angular.module('app.controllers', [])

    .controller('mainCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', 'UsuarioService', 'ExercicioService', 'ListaService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicLoading, $http, UsuarioService, ExercicioService, ListaService) {
            $ionicLoading.show({
                template: '<ion-spinner icon="lines"></ion-spinner>',
            });
            $scope.contador = 2;
            $scope.date = new Date().getUTCFullYear();
            $scope.exercicio = {}
            $http({
                method: 'GET',
                url: 'http://localhost/ws/web/v1/spe-gestor/busca-dados-usuario?imei=357798072306630',
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
                url: 'http://localhost/ws/web/v1/spe-gestor/busca-lista-competencia',
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
                    url: 'http://localhost/ws/web/v1/spe-gestor/busca-competencia-ano?ano=' + ExercicioService.getSelectedAno(),
                }).then(function (success) {
                    ListaService.setObject(success.data[ExercicioService.getSelectedAno()]);
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
            }).then(function (success) {
                $ionicLoading.hide();
                console.log(success.data);
                BlankService.setObject(success.data);
            }, function (error) {
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
