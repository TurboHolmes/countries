import { Component } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ICountry, ApiService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries$?: Observable<ICountry[]>;

  private _filterQuery$ = new Subject<{ search: string; region: string }>();
  private _destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.countries$ = combineLatest([
      this._filterQuery$,
      this.apiService.getAllCountry(),
    ]).pipe(
      map(([filterQuery, countries]) =>
        countries
          .filter((country) => {
            if (filterQuery.region === '') return true;

            return (
              country.region.toLowerCase() === filterQuery.region.toLowerCase()
            );
          })
          .filter((country) =>
            country.name
              .toLowerCase()
              .includes(filterQuery.search.toLowerCase())
          )
      )
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
