import { Component } from '@angular/core';
import { intersectionBy } from 'lodash';
import { combineLatest, iif, map, Observable, Subject, switchMap } from 'rxjs';
import { ApiService, Country } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries$?: Observable<Country[]>;

  private _filterQuery$ = new Subject<{ search: string; region: string }>();
  private _destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.countries$ = this._filterQuery$.pipe(
      switchMap((filterQuery) => {
        return combineLatest([
          iif(
            () => filterQuery.search !== '',
            this.apiService.searchCountryByName(filterQuery.search),
            this.apiService.getCountries()
          ),
          iif(
            () => filterQuery.region !== 'all',
            this.apiService.getCountriesByRegion(filterQuery.region),
            this.apiService.getCountries()
          ),
        ]).pipe(
          map(([countriesBySearch, countriesByRegion]) =>
            intersectionBy(countriesByRegion, countriesBySearch, 'cca3')
          )
        );
      })
    );
  }

  onFilterChange(changes: { search: string; region: string }) {
    this._filterQuery$.next(changes);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
