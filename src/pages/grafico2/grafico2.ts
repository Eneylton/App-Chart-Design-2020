import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';

@IonicPage({})
@Component({
  selector: 'page-grafico2',
  templateUrl: 'grafico2.html',
})
export class Grafico2Page {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  tipo:any;
  total:any;

  estatisticas: any = {
    "jsonarray": [
      {
       "tipo": "Loja",
       "total": 12
      }, {
       "tipo": "Produto",
       "total": 14
      },

      {
        "tipo": "Servico",
        "total": 14
       }

    ]
 };


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {

    setTimeout(() => {
    
      this.barChart = this.getBarChart();

    }, 150);
  
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }



  getBarChart() {

   
    for (let i = 0; i < this.estatisticas.jsonarray.length; i++){

		  var labels = this.estatisticas.jsonarray.map(function(e) {
			return e.tipo;
			});

		   var data2 = this.estatisticas.jsonarray.map(function(e) {
		  return e.total;
		  });

      console.log(labels);

    }

      const data = {
        
     
        labels:labels,
        datasets: [{
          label: '# Estatística',
          data: data2,
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
      };
      const options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };
  
      return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
    }

    }


