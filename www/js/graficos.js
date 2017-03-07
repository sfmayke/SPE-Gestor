var geraGrafico = (function () {
  "use strict";
   return {      
      piechart: (function (data1, data2) {
        var ctx = document.getElementById("myChart");
            return new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: 
                    [{
                        data: [
                            data1,
                            data2,
                        ],
                        backgroundColor: [
                            "#FF6384",
                            "#4BC0C0",
                        ],
                        borderColor: [
                            "#ffffff",
                            "#ffffff",
                        ],
                    }],
                    labels: [
                        "Entregues",
                        "Não entregues",
                    ],                    
                },
                options: {
                    
                    elements: {
                        arc: {
                            borderColor: "black"
                        }
                    },
                    legend: {
                        position: 'bottom',
                        onClick: function(e){ e.stopPropagation(); } ,
                        display: true,
                        labels: {
                            fontColor: 'black'
                        }
                        
                    },
                    title: {
                        display: true,
                        text: '3º Quadrimestre',
                        fontSize: 18,
                    },
                }
            });
      })
   };
}());