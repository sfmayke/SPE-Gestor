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
            var ctx = document.getElementById("myChart");
            new Chart(ctx, {
                type: 'polarArea',
                data: {
                    datasets: [{
                        data: [
                            11,
                            16,
                            7,
                            3,
                            14
                        ],
                        backgroundColor: [
                            "#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"
                        ],
                        label: 'My dataset' // for legend
                    }],
                    labels: [
                        "Red",
                        "Green",
                        "Yellow",
                        "Grey",
                        "Blue"
                    ]
                },
                options: {
                    elements: {
                        arc: {
                            borderColor: "#000000"
                        }
                    }
                }
            });
        }])

    .controller('lOACtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }])

    .controller('balancoGeralCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
            var ctx = document.getElementById("myChart");
            var myBubbleChart = new Chart(ctx, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            label: 'First Dataset',
                            data: [
                                {
                                    x: 20,
                                    y: 30,
                                    r: 15
                                },
                                {
                                    x: 40,
                                    y: 10,
                                    r: 10
                                },
                                {
                                    x: 32,
                                    y: 19,
                                    r: 22
                                },
                                {
                                    x: 53,
                                    y: 34,
                                    r: 18
                                },
                                {
                                    x: 43,
                                    y: 21,
                                    r: 8
                                },
                                {
                                    x: 53,
                                    y: 43,
                                    r: 21
                                },
                            ],
                            backgroundColor: "#FF6384",
                            hoverBackgroundColor: "#FF6384",
                        }]
                },
                options: {
                    elements: {
                        points: {
                            borderWidth: 1,
                            borderColor: 'rgb(0, 0, 0)'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }])
