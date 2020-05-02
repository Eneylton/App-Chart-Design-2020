import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-grafico4',
  templateUrl: 'grafico4.html',
})
export class Grafico4Page {
  @ViewChild('pieCanvas') pieCanvas;

  pieChart: any;
  localidades: Array<Object> = [];
  sexo: string;
  total: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public serve: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Grafico4Page');
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.pieChart = this.getPieChart();

    }, 350);
  }

  getPieChart() {

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
      datasets: [
        {
          data: total,
          backgroundColor: ['#FF00c8', '#CDDC39', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', result);

  })
}


}
