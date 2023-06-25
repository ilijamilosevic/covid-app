import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Observer } from 'rxjs';
import { CovidData } from '../entity/covidData';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private url: string = "https://covid-19.dataflowkit.com/v1";

  constructor(private http: HttpClient) { }

  getCovidData(): Observable<CovidData[]>{
    return this.http.get<CovidData[]>(this.url).pipe(catchError(this.handleError), 
    map((data:any) => data.map((dataItem: any) => this.createDataObject(dataItem))));    
  }

  getDataForCountry(country: string): Observable<CovidData>{
    return this.http.get<CovidData>(this.url + '/' + country).pipe(catchError(this.handleError),
    map((data: any) => this.createDataObject(data)));
  }

  public handleError(error: HttpErrorResponse) {
    return new Observable((observer: Observer<any>) => {
      observer.error(error);
    })
  }

  public createDataObject(data: any): CovidData{
    return new CovidData(data["Country_text"], 
    data["Total Cases_text"], 
    data["Total Recovered_text"], 
    data["Total Deaths_text"], 
    );
  }
}
