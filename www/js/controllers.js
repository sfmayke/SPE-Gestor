angular.module('app.controllers', [])

    .controller('mainCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', 'UsuarioFactory', 'ListaFactory', 'CompetenciaFactory', 'UsuarioService', 'ExercicioService', 'ListaService', '$ionicHistory', 'NotificacaoFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicPopup, $ionicLoading, UsuarioFactory, ListaFactory, CompetenciaFactory, UsuarioService, ExercicioService, ListaService, $ionicHistory, NotificacaoFactory) {
            $ionicHistory.clearHistory();
            geraslider.slide();
            $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
            $scope.date = new Date().getUTCFullYear();
            $scope.exercicio = {}

            UsuarioFactory.getUsuario('357798072306630').then(function (success) {
                $scope.user = UsuarioService.getObject();
                //$scope.user.IMEI = 'e0e0bd0ef84f7d03';
                //$scope.user.IMEI = '357798072306630';   
                if (success != undefined) {
                    //  window.plugins.OneSignal.getTags(function (tags) {
                    //      if (!tags) {
                    //          window.plugins.OneSignal.sendTag("Controladoria", $scope.user['COD_SETOR']);
                    //      }
                    //  });
                    ListaFactory.getLista().then(function (success) {
                        $scope.exercicio.lista = ExercicioService.getObject();
                        $scope.carregaNotificacoes(false);
                    });
                }
            });
            $scope.carregaNotificacoes = function (botao) {                
                NotificacaoFactory.getNotificacao(UsuarioService.getObject()).then(function (success) {
                    $scope.notificacoes = success
                    if(!botao){
                        $scope.funcao($scope.date.toString());
                        $scope.exercicio.opcoes = ExercicioService.getSelectedAno();
                    }else{
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                })
            }
            $scope.funcao = function (ano) {
                $ionicLoading.show({ template: '<ion-spinner icon="lines"></ion-spinner>' });
                ExercicioService.setSelectedAno(ano);
                CompetenciaFactory.getCompetencia(ExercicioService.getSelectedAno()).then(function (success) {
                    ListaService.setObject(success);
                    $scope.competencia = ListaService.getObject();
                    $ionicLoading.hide();
                });
            }
        }])

    .controller('perfilCtrl', ['$scope', '$stateParams', 'UsuarioService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, UsuarioService) {

            $scope.user = UsuarioService.getObject();
            $scope.anoAtual = new Date().getUTCFullYear();
            console.log($scope.user);

        }])

    .controller('notificacoesCtrl', ['$scope', '$stateParams', '$ionicSlideBoxDelegate', 'NotificacaoFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicSlideBoxDelegate, NotificacaoFactory) {

        }])

    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$window', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $ionicHistory, $window, $ionicPopup) {

            $scope.loginEmail = function (email, senha) {

                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .then(function (success) {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });

                        $state.go('main')
                    }).then(function (fail) { $scope.errorLogin = "Email e/ou Senha incorretos." })
                    .catch(function (error) {
                        // Handle Errors here.
                        if (errorCode = "auth/wrong-password") {
                            $ionicPopup.alert({
                                template: 'Senha Incorreta.'
                            });
                        }
                        else if (errorCode = "auth/user-not-found") {
                            $ionicPopup.alert({
                                template: 'Email não cadastrado.'
                            });
                        }
                        var errorCode = error.code;
                        console.log(errorCode);
                        var errorMessage = error.message;
                    });

                // ref.authWithPassword({
                //     email: email,
                //     password: senha
                // }, function (error, authData) {
                //     if (error) {
                //         console.log("Login Failed!", error);
                //     } else {
                //         console.log("Authenticated successfully with payload:", authData);
                //     }
                // });
            };
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
                .then(function (success) {
                    $ionicLoading.hide();
                    grafico = null;
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
                .then(function (success) {
                    $ionicLoading.hide();
                    grafico = null;
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
                .then(function (success) {
                    $ionicLoading.hide();
                    grafico = null;
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
                .then(function (success) {
                    $ionicLoading.hide();
                    grafico = null;
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
                .then(function (success) {
                    $ionicLoading.hide();
                    grafico = null;
                    $scope.numreg = (Object.keys(success).length - 1);
                    $scope.munsel = $scope.numreg.toString();
                    $scope.municipio = success;
                    $scope.select = selecao;
                    $scope.select.reload($scope.munsel, $scope.numreg, success);
                });

        }])