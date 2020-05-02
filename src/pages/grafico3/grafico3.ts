import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import chartJs from 'chart.js';

@IonicPage({})
@Component({
  selector: 'page-grafico3',
  templateUrl: 'grafico3.html',
})
export class Grafico3Page {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  localidades: Array<Object> = [];
  sexo: string;
  total: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serve: ServiceProvider) {
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
    let body = {

      crud: 'Listar_Estatistica'

    }
    this.serve.postData(body, 'servidor.php').subscribe(data => {
      for (let loja of data.result) {

        this.localidades.push({

          sexo: loja.sexo,
          total: loja.total
        })

        var labels = this.localidades.map(function (e) {
          return e["sexo"];
        });

        var total = this.localidades.map(function (e) {
          return e["total"];
        });

        console.log("CHEGOU AKI: --> ", labels);
        console.log("CHEGOU AKI: --> ", total);

      }

      const result = {

        labels: labels,
        datasets: [{
          label: '# Estatística',
          data: total,
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
  
      return this.getChart(this.barCanvas.nativeElement, 'bar', result, options);
    })

  
}


}