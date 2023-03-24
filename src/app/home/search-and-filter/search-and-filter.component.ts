import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  Observable,
  startWith,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.scss'],
})
export class SearchAndFilterComponent {
  @Output() changes: Observable<{ search: string; region: string }> = EMPTY;

  readonly regions = [
    { value: 'africa', region: 'Africa' },
    { value: 'americas', region: 'America' },
    { value: 'asia', region: 'Asia' },
    { value: 'europe', region: 'Europe' },
    { value: 'oceania', region: 'Oceania' },
  ];

  filterForm = this._fb.nonNullable.group({
    search: [''],
    region: [''],
  });

  constructor(private _fb: FormBuilder) {
    const search$ =
      this.filterForm
        .get('search')
        ?.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged()
        ) ?? EMPTY;

    const region$ =
      this.filterForm.get('region')?.valueChanges.pipe(startWith('')) ?? EMPTY;

    this.changes = combineLatest({ search: search$, region: region$ });
  }
}
