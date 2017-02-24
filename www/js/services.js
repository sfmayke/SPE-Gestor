angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

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
}]);