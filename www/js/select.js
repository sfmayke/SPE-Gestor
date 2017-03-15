var grafico = null;

var selecao = (function () {
  "use strict";
   return {      
      reload: (function (selecionado, total, objeto) {                        
            var graficoparam;         
            if (selecionado == total) {
                graficoparam = objeto['TOTAL'];
            } else {
                graficoparam = objeto[selecionado];
            }            
            if(grafico == null){
                grafico = geraGrafico.piechart(graficoparam.ENVIADOS, graficoparam.NAO_ENVIADOS);
            }else{
                grafico.data.datasets[0].data[0] = graficoparam.ENVIADOS;
                grafico.data.datasets[0].data[1] = graficoparam.NAO_ENVIADOS;
                grafico.update();           
            }            
      })
   };
}());