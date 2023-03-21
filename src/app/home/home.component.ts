import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICountry, ApiService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries$?: Observable<ICountry[]>;

  private _destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.countries$ = this.apiService
      .getAllCountry()
      .pipe(takeUntil(this._destroy$));
  }

  filterChange(changes: { search: string; region: string }) {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
