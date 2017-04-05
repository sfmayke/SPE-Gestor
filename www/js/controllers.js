angular.module('app.controllers', [])

    .controller('mainCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', 'UsuarioFactory', 'ListaFactory', 'CompetenciaFactory', 'UsuarioService', 'ExercicioService', 'ListaService', '$ionicHistory', 'NotificacaoFactory', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicPopup, $ionicLoading, UsuarioFactory, ListaFactory, CompetenciaFactory, UsuarioService, ExercicioService, ListaService, $ionicHistory, NotificacaoFactory, $state) {
            $ionicHistory.clearHistory();
            $scope.tentaAutenticar = function () {
                if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                    firebase.auth().signInWithEmailAndPassword(email, senha)
                        .catch(function (error) {
                            $ionicPopup.alert({
                                template: 'Email ou Senha Inválidos.'
                            });
                            $state.go('login');
                        })
                }
            }
            $scope.tentaAutenticar();
            geraslider.slide();
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Buscando Usuário</div></div>' });
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
                    $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Procurando Exercícios</div></div>' });
                    ListaFactory.getLista().then(function (success) {
                        $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Carregando Notificações</div></div>' });
                        $scope.exercicio.lista = ExercicioService.getObject();
                        $scope.carregaNotificacoes(false);
                    });
                }
            });
            $scope.carregaNotificacoes = function (botao) {
                $scope.tentaAutenticar();
                NotificacaoFactory.getNotificacao(UsuarioService.getObject()).then(function (success) {
                    $scope.notificacoes = success
                    if (!botao) {
                        $scope.funcao($scope.date.toString());
                        $scope.exercicio.opcoes = ExercicioService.getSelectedAno();
                    } else {
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                })
            }
            $scope.funcao = function (ano) {
                $scope.tentaAutenticar();
                $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Listando Competências</div></div>' });
                ExercicioService.setSelectedAno(ano);
                CompetenciaFactory.getCompetencia(ExercicioService.getSelectedAno()).then(function (success) {
                    ListaService.setObject(success);
                    $scope.competencia = ListaService.getObject();
                    $ionicLoading.hide();
                });
            }
            $scope.sair = function () {
                window.localStorage.clear();
                $state.go('login');
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

    .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$window', '$ionicPopup', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $ionicHistory, $window, $ionicPopup, $ionicLoading) {
            //window.localStorage.clear();            
            $scope.loginEmail = function (email, senha) {
                $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Tentando autenticar</div></div>' });
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .then(function (success) {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });

                        window.localStorage.setItem("email", email);
                        window.localStorage.setItem("senha", senha);
                        window.localStorage.setItem("lastLogin", data.getDataAtual())
                        $state.go('main')
                    }).then(function (fail) { $scope.errorLogin = "Email e/ou Senha incorretos." })
                    .catch(function (error) {
                        // Handle Errors here.
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                    });
            };
            if (window.localStorage.getItem("email") != null) {
                $scope.loginEmail(window.localStorage.getItem("email"), window.localStorage.getItem("senha"));
                // firebase.auth().signInWithEmailAndPassword(window.localStorage.getItem("email"), window.localStorage.getItem("senha"))
                // .then(function (success) {
                //     $ionicHistory.nextViewOptions({
                //         disableBack: true
                //     });
                //     $state.go('main')
                // }).then(function (fail) { $state.go('login') })
            }
        }])

    .controller('suporteAjudaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('quadrimestre1Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory, $ionicPopup) {
            if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .catch(function (error) {
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                        $state.go('login');
                    })
            }
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Montando Gráfico</div></div>' });
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

    .controller('quadrimestre2Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory, $ionicPopup) {
            if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .catch(function (error) {
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                        $state.go('login');
                    })
            }
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Montando Gráfico</div></div>' });
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

    .controller('quadrimestre3Ctrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory, $ionicPopup) {
            if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .catch(function (error) {
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                        $state.go('login');
                    })
            }
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Montando Gráfico</div></div>' });
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

    .controller('lOACtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory, $ionicPopup) {
            if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .catch(function (error) {
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                        $state.go('login');
                    })
            }
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Montando Gráfico</div></div>' });
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

    .controller('balancoGeralCtrl', ['$scope', '$stateParams', 'ExercicioService', 'UsuarioService', '$http', '$ionicLoading', '$state', 'MunicipiosService', 'OrgaoFactory', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, ExercicioService, UsuarioService, $http, $ionicLoading, $state, MunicipiosService, OrgaoFactory, $ionicPopup) {
            if (window.localStorage.getItem('lastLogin') != data.getDataAtual()) {
                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .catch(function (error) {
                        $ionicPopup.alert({
                            template: 'Email ou Senha Inválidos.'
                        });
                        $state.go('login');
                    })
            }
            $ionicLoading.show({ template: '<div class="row"><div class="col col-20"><ion-spinner icon="crescent"></ion-spinner></div><div class="col col-80"><p></p> Montando Gráfico</div></div>' });
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