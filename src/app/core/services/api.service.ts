import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, find, from, map, share, switchMap } from 'rxjs';
import { ICountry } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _countries = new BehaviorSubject<ICountry[]>([]);

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  loadCountries() {
    return this.http
      .get<ICountry[]>('/assets/data.json')
      .subscribe(this._countries);
  }

  getAllCountry() {
    return this._countries.asObservable();
  }

  getCountry(countryName: string) {
    return from(this._countries.getValue()).pipe(
      find((country) => country.name === countryName)
    );
  }
}
