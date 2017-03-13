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
            geraGrafico.piechart(graficoparam.ENVIADOS, graficoparam.NAO_ENVIADOS);                
      })
   };
}());