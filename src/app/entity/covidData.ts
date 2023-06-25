export class CovidData{
    country: string;
    totalCases: string;
    totalRecovered: string;
    totalDeaths: string;

    constructor(country: string, totalCases: string, totalRecovered: string, totalDeaths: string){
        this.country = country;
        this.totalCases = totalCases;
        this.totalRecovered = totalRecovered;
        this.totalDeaths = totalDeaths;
    }
}