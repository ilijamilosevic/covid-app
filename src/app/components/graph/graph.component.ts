import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CovidData } from 'src/app/entity/covidData';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  chart: any;
  chartPie: any;
  covidDataObjects: CovidData[] = [];
  countryName: string = "";
  countries: string[] = [];
  values: number[] = [];
  covidDataObject: CovidData = new CovidData("", "", "", "");

  constructor(private _covidDataService: CovidDataService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this._covidDataService.getCovidData().subscribe((data: CovidData[]) => {
      this.covidDataObjects = data;
      this.covidDataObjects.pop();
      this.populateChartData();
      this.createBarChart();
    },
    (error: any) => {
      console.log(error.error.message);
    });
  }

  populateChartData(){
    this.covidDataObjects.slice(1, 11).forEach(element => {
      this.countries.push(element.country);
      this.values.push(parseFloat(element.totalCases.replace(/,/g, '')));
    })
  }

  createBarChart(){
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.countries,
        datasets: [
          {
            label: 'Total Confirmed Cases',
            data: this.values,
            backgroundColor: '#47b9ff',
          }
        ]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#fff'
            },
          },
          title: {
            display: true,
            text: 'Top 10 countries with the most total cases',
            color: '#fff'
          }
        },
        scales:{
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            ticks: {
              color: '#fff',
            }
          }
        }
      },
    })
  }

}
