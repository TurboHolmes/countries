import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs';
import { ICountry } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllCountry() {
    return this.http.get<ICountry[]>('/assets/data.json').pipe(share());
  }
}
