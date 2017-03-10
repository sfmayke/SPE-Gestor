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
                if ($scope.contador == 0) {
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
                if ($scope.contador == 0) {
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

    .controller('quadrimestre1Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.usuario = UsuarioService.getObject();
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia=1&controladoria=' + $scope.usuario.COD_SETOR,
            }).then(function (success) {
                $ionicLoading.hide();
                $scope.numreg = (Object.keys(success.data).length - 1);
                $scope.munsel = $scope.numreg.toString();
                $scope.municipio = success.data;
                console.log($scope.municipio[0].ORGAOS[0]);
                MunicipiosService.setObject($scope.municipio);
                $scope.reload($scope.munsel, $scope.numreg);
            });

            $scope.reload = function (selecionado, total) {
                $scope.objeto = MunicipiosService.getObject();
                if (selecionado == total) {
                    $scope.graficoparam = $scope.objeto['TOTAL'];
                } else {
                    $scope.graficoparam = $scope.objeto[selecionado];
                }
                geraGrafico.piechart($scope.graficoparam.ENVIADOS, $scope.graficoparam.NAO_ENVIADOS);
            }
        }])

    .controller('quadrimestre2Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.usuario = UsuarioService.getObject();
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia=2&controladoria=' + $scope.usuario.COD_SETOR,
            }).then(function (success) {
                $ionicLoading.hide();
                $scope.numreg = (Object.keys(success.data).length - 1);
                $scope.munsel = $scope.numreg.toString();
                $scope.municipio = success.data;
                console.log($scope.municipio[0].ORGAOS[0]);
                MunicipiosService.setObject($scope.municipio);
                $scope.reload($scope.munsel, $scope.numreg);
            });

            $scope.reload = function (selecionado, total) {
                $scope.objeto = MunicipiosService.getObject();
                if (selecionado == total) {
                    $scope.graficoparam = $scope.objeto['TOTAL'];
                } else {
                    $scope.graficoparam = $scope.objeto[selecionado];
                }
                geraGrafico.piechart($scope.graficoparam.ENVIADOS, $scope.graficoparam.NAO_ENVIADOS);
            }
        }])

    .controller('quadrimestre3Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.usuario = UsuarioService.getObject();
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia=3&controladoria=' + $scope.usuario.COD_SETOR,
            }).then(function (success) {
                $ionicLoading.hide();
                $scope.numreg = (Object.keys(success.data).length - 1);
                $scope.munsel = $scope.numreg.toString();
                $scope.municipio = success.data;
                console.log($scope.municipio[0].ORGAOS[0]);
                MunicipiosService.setObject($scope.municipio);
                $scope.reload($scope.munsel, $scope.numreg);
            });

            $scope.reload = function (selecionado, total) {
                $scope.objeto = MunicipiosService.getObject();
                if (selecionado == total) {
                    $scope.graficoparam = $scope.objeto['TOTAL'];
                } else {
                    $scope.graficoparam = $scope.objeto[selecionado];
                }
                geraGrafico.piechart($scope.graficoparam.ENVIADOS, $scope.graficoparam.NAO_ENVIADOS);
            }
        }])

    .controller('lOACtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.usuario = UsuarioService.getObject();
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia=901&controladoria=' + $scope.usuario.COD_SETOR,
            }).then(function (success) {
                $ionicLoading.hide();
                $scope.numreg = (Object.keys(success.data).length - 1);
                $scope.munsel = $scope.numreg.toString();
                $scope.municipio = success.data;
                console.log($scope.municipio[0].ORGAOS[0]);
                MunicipiosService.setObject($scope.municipio);
                $scope.reload($scope.munsel, $scope.numreg);
            });

            $scope.reload = function (selecionado, total) {
                $scope.objeto = MunicipiosService.getObject();
                if (selecionado == total) {
                    $scope.graficoparam = $scope.objeto['TOTAL'];
                } else {
                    $scope.graficoparam = $scope.objeto[selecionado];
                }
                geraGrafico.piechart($scope.graficoparam.ENVIADOS, $scope.graficoparam.NAO_ENVIADOS);
            }
        }])

    .controller('balancoGeralCtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService) {
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.usuario = UsuarioService.getObject();
            $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia=901&controladoria=' + $scope.usuario.COD_SETOR,
            }).then(function (success) {
                $ionicLoading.hide();
                $scope.numreg = (Object.keys(success.data).length - 1);
                $scope.munsel = $scope.numreg.toString();
                $scope.municipio = success.data;
                MunicipiosService.setObject($scope.municipio);
                $scope.reload($scope.munsel, $scope.numreg);
            });

            $scope.reload = function (selecionado, total) {
                $scope.objeto = MunicipiosService.getObject();                
                if (selecionado == total) {
                    $scope.graficoparam = $scope.objeto['TOTAL'];
                } else {
                    $scope.graficoparam = $scope.objeto[selecionado];
                }     
                geraGrafico.piechart($scope.graficoparam.ENVIADOS, $scope.graficoparam.NAO_ENVIADOS);
            }
        }])