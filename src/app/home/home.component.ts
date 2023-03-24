import { Component } from '@angular/core';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ICountry, ApiService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries$?: Observable<ICountry[]>;

  private filterQuery$ = new Subject<{ search: string; region: string }>();
  private _destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.countries$ = this.filterQuery$.pipe(
      switchMap((filterQuery) => {
        return this.apiService.getAllCountry().pipe(
          map((countries) =>
            countries
              .filter((country) => {
                if (filterQuery.region === '') return true;

                return (
                  country.region.toLowerCase() ===
                  filterQuery.region.toLowerCase()
                );
              })
              .filter((country) =>
                country.name
                  .toLowerCase()
                  .includes(filterQuery.search.toLowerCase())
              )
          )
        );
      }),
      takeUntil(this._destroy$)
    );
  }

  onFilterChange(changes: { search: string; region: string }) {
    this.filterQuery$.next(changes);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
