import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ApiService, Country, Currencies, Languages } from '../core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  country$?: Observable<Country>;
  borders$?: Observable<string[]>;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.country$ = this.route.queryParamMap.pipe(
      map((paramMap) => paramMap.get('country') ?? ''),
      switchMap((countryName) => {
        return this.apiService
          .getCountryByName(countryName)
          .pipe(map((data) => data[0]));
      })
    );

    this.borders$ = this.country$.pipe(
      map((country) => country.borders),
      filter(Boolean),
      switchMap((borderCodes) => {
        return this.apiService
          .getCountriesByCode(borderCodes)
          .pipe(
            map((countries) =>
              countries.map((country) => country.name.official)
            )
          );
      })
    );
  }

  transformCurrencies(currencies: Currencies) {
    return Object.values(currencies)
      .map((currency) => currency.name)
      .join(',');
  }

  transformLanguages(languages: Languages) {
    return Object.values(languages).join(',');
  }
}
