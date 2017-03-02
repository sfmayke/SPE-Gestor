angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js



  $stateProvider

  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'mainCtrl'
  })

  .state('lOA', {
    url: '/L.O.A.',
    templateUrl: 'templates/lOA.html',
    controller: 'lOACtrl',
  })

  .state('tabsController.perfil', {
    url: '/perfil',
    views: {
      'tab1': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('tabsController.notificacoes', {
    url: '/notificacoes',
    views: {
      'tab2': {
        templateUrl: 'templates/notificacoes.html',
        controller: 'notificacoesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('suporteAjuda', {
    url: '/suporte-ajuda',
    templateUrl: 'templates/suporteAjuda.html',
    controller: 'suporteAjudaCtrl'
  })

  .state('quadrimestre1', {
    url: '/1º Quadrimestre',
    templateUrl: 'templates/quadrimestre1.html',
    controller: 'quadrimestre1Ctrl'
  })

  .state('quadrimestre2', {
    url: '/2º Quadrimestre',
    templateUrl: 'templates/quadrimestre2.html',
    controller: 'quadrimestre2Ctrl'
  })

  .state('quadrimestre3', {
    url: '/3º Quadrimestre',
    templateUrl: 'templates/quadrimestre3.html',
    controller: 'quadrimestre3Ctrl'
  })

  .state('balancoGeral', {
    url: '/Balanco Geral',
    templateUrl: 'templates/balancoGeral.html',
    controller: 'balancoGeralCtrl'
  })

    $urlRouterProvider.otherwise('/main');
});
