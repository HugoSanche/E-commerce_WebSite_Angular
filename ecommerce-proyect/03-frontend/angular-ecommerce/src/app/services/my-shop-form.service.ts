import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyShopFormService {
  private countriesURL=environment.myproyectsApiUrl+'/countries';
  private statesURL=environment.myproyectsApiUrl+'/states';
  //inyectando dependencias
  constructor(private httpClient:HttpClient) { }
  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesURL).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesURL}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

getCreditCardMonths(startMonth: number):Observable<number[]>{
  let data:number[]=[];

  //build an array for "Month" dropdown list
  // -start at current month add loop until
  for(let theMonth=startMonth; theMonth<=12; theMonth++){
    data.push(theMonth);
  }
  return of(data);

}

getCreditCardYears(): Observable<number[]>{
  let data:number[]=[];

  // build an array for "Year" downlist list
  // - start at current year and loop for next 10 years

  const startYear: number =new Date().getFullYear();
  const endYear:number=startYear+10;

  for (let theYear = startYear; theYear<= endYear; theYear++){
    data.push(theYear);
  }
  return of(data);
}

}
interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[];
  }
}