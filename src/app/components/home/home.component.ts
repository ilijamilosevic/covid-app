import { Component, OnInit } from '@angular/core';
import { CovidData } from 'src/app/entity/covidData';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedCountry: string = "World";
  cardTitles: string[] = [];
  date: string = "";
  time: string = "";
  covidDataObject: CovidData = new CovidData("", "", "", "");
  errorMessage: any;

  constructor(private _covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.getData();
    this.getCardTitles();
    this.displayTime();
  }

  getData(){
    this._covidDataService.getDataForCountry(this.selectedCountry).subscribe((data: CovidData) => {
      this.covidDataObject.country = data.country;
      this.covidDataObject.totalCases = data.totalCases;
      this.covidDataObject.totalDeaths = data.totalDeaths;
      this.covidDataObject.totalRecovered = data.totalRecovered;
    },
    (error: any) => {
      this.errorMessage = error.error.message;
    });
  }

  receiveCountry(country: string){
    this.selectedCountry = country;
    this.getData();
  }

  displayTime(){
    this.date = new Date().toLocaleDateString();
    this.time = new Date().toLocaleTimeString();
    setInterval(() => {
      this.date = new Date().toLocaleDateString();
      this.time = new Date().toLocaleTimeString();
    }, 1000)
  }

  getCardTitles(){
    let title = "";
    Object.keys(this.covidDataObject).forEach(element => {
      for(let i = 0; i < element.length; i++){
        if(i == 0){
          title += element[i].toUpperCase();
        }
        else if(element[i] === element[i].toUpperCase()){
          title += ' ' + element[i]; 
        }
        else{
          title += element[i];
        }
      }

      this.cardTitles.push(title);
      title = '';
    });
  }

}
