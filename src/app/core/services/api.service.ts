import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, share } from 'rxjs';
import { Country } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<Country[]>(`${this.apiUrl}/all`).pipe(share());
  }

  getCountriesByRegion(region: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`);
  }

  getCountryByName(name: string) {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${name}?fullText=true`)
      .pipe(
        catchError((err) => of([])),
        share()
      );
  }

  getCountriesByCode(codes: string[]) {
    return this.http.get<Country[]>(
      `${this.apiUrl}/alpha?codes=${codes.join(',')}`
    );
  }

  searchCountryByName(name: string) {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${name}`)
      .pipe(catchError((err) => of([])));
  }
}
