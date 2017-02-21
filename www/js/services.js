angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){
    var objeto

    return{
        setObject: function(value){
            objeto = value;
        },

        getObject: function(value){
            return objeto;
        }
    }
}]);