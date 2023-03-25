import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { ApiService, ICountry } from '../core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  details$?: Observable<ICountry>;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.details$ = this.route.queryParamMap.pipe(
      map((paramMap) => paramMap.get('country') ?? ''),
      switchMap((countryName) => {
        return this.apiService.getCountry(countryName).pipe(filter(Boolean));
      })
    );
  }

  transformCurrencies(currencies: ICountry['currencies']) {
    return currencies.map((currency) => currency.name).join(',');
  }

  transformLanguages(languages: ICountry['languages']) {
    return languages.map((language) => language.name).join(',');
  }
}
