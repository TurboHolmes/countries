import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchAndFilterComponent } from './search-and-filter/search-and-filter.component';


@NgModule({
  declarations: [HomeComponent, SearchAndFilterComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
