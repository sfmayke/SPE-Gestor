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
                            "#7ADB5A",
                            "#E03C1B",
                        ],
                        borderColor: [
                            "#ffffff",
                            "#ffffff",
                        ],
                    }],
                    labels: [
                        "Entregues: " + data1,
                        "Não entregues: " + data2,
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
                            fontColor: 'black',
                            fontSize: 14,
                        }
                    },
                }
            });
      })
   };
}());