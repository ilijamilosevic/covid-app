import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CovidData } from 'src/app/entity/covidData';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {

  @Output() countryEmitter: EventEmitter<string> = new EventEmitter<string>();
  selectedCountry: string = "";
  covidDataObjects: CovidData[] = [];
  errorMessage: any;
  selectControl: FormControl = new FormControl();

  constructor(private _covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this._covidDataService.getCovidData().subscribe((data: CovidData[]) => {
      this.covidDataObjects = data;
      this.covidDataObjects.pop();
      this.covidDataObjects.sort((a, b) => a.country.localeCompare(b.country));
    },
    (error: any) => {
      this.errorMessage = error.error.message;
    })
  }

  sendCountry(country: string){
    this.countryEmitter.emit(country);
  }

  resetCountry(){
    this.countryEmitter.emit("World");
    this.selectControl.reset();
  }

}
