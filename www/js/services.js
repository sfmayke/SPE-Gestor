angular.module('app.services', [])


.factory('OrgaoFactory', function($http, $log, ExercicioService, UsuarioService) {

    var OrgaoFactory = {};
    var usuario = UsuarioService.getObject();
    OrgaoFactory.getOrgao = function(competencia) {
        return $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-orgaos?ano=' + ExercicioService.getSelectedAno() + '&competencia='+competencia+'&controladoria=' + usuario.COD_SETOR
            })
            .then(function(response) {
                return response.data;
            })
            .catch($log.err);
    }

    return OrgaoFactory;
})

.factory('Auth', function($firebaseAuth) {
    var endPoint = "https://console.firebase.google.com/project/onesignal-ionic-example-master" ;
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })
  

.factory('UsuarioFactory', function($http, $log, UsuarioService, $ionicPopup, $ionicLoading) {

    var UsuarioFactory = {};
    
    UsuarioFactory.getUsuario = function(uuid) {
        return $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-dados-usuario?imei='+uuid
            })
            .then(function(response) {
                if(response.data[0] == undefined){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                         title: 'Dispositivo Inválido',
                         template: 'Conecte com um dispositivo que tenha permissão de acesso ao aplicativo'
                     });
                     alertPopup.then(function () {
                         ionic.Platform.exitApp();
                     });
                }else{
                    UsuarioService.setObject(response.data[0]);
                    return response.data;
                }                
            })
            .catch($log.err);
    }

    return UsuarioFactory;
})

.factory('ListaFactory', function($http, $log, ExercicioService) {

    var ListaFactory = {};
    
    ListaFactory.getLista = function() {
        return $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-lista-competencia',
            })
            .then(function(response) {
                ExercicioService.setObject(response.data);
                return response.data;
            })
            .catch($log.err);
    }

    return ListaFactory;
})

.factory('CompetenciaFactory', function($http, $log) {
    //ExercicioService.getSelectedAno()
    var CompetenciaFactory = {};
    
    CompetenciaFactory.getCompetencia = function(ano) {
        return $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/busca-competencia-ano?ano=' + ano,
            })
            .then(function(response) {                
                return response.data[ano];
            })
            .catch($log.err);
    }

    return CompetenciaFactory;
})

.factory('NotificacaoFactory', function($http, $log) {
    //ExercicioService.getSelectedAno()
    var NotificacaoFactory = {};       
    NotificacaoFactory.getNotificacao = function(usuario) {        
        return $http({
                method: 'GET',
                url: 'http://10.2.21.48/ws/web/v1/spe-gestor/notificacoes?controladoria=' + usuario.COD_SETOR,
            })
            .then(function(response) {                              
                return response.data;
            })
            .catch($log.err);
    }

    return NotificacaoFactory;
})

.service('UsuarioService', [function(){
    var usuario

    return{
        setObject: function(value){
            usuario = value;            
        },

        getObject: function(value){
            return usuario;
        }
    }
}])

.service('ExercicioService', [function(){
    var exercicios;
    var ano;

    return{
        setObject: function(value){
            exercicios = value;            
        },

        setSelectedAno: function(value){
            ano = value;            
        },

        getSelectedAno: function(value){
            return ano;            
        },

        getObject: function(value){
            return exercicios;
        }
    }
}])

.service('ListaService', [function(){
    var lista

    return{
        setObject: function(value){
            lista = value;            
        },

        getObject: function(value){
            return lista;
        }
    }
}])

.service('MunicipiosService', [function(){
    var municipios

    return{
        setObject: function(value){
            municipios = value;            
        },

        getObject: function(value){
            return municipios;
        }
    }
}]);