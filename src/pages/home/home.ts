import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any[];
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

  constructor(public navCtrl: NavController) { }

  graficoPizza(){

    

    var labels = this.estatisticas.jsonarray.map(function(e) {
        return (e.tipo);
        });

    var data2 = this.estatisticas.jsonarray.map(function(e) {
      return (e.total);
      });



    var todos = google.visualization.arrayToDataTable(
      [
      ['Tarefa', 'Horas por dia'],
       
      [String(labels),parseInt(data2)]
      
      
      ]
      
      
      );
    
    var options = {
      title: 'Minhas atividades diárias',
      is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(todos, options);

  
    

  }
    
  }


