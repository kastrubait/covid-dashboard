import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableBlockComponent } from './components/table-block/table-block.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';

@NgModule({
  declarations: [TestComponent, HomePageComponent, TableBlockComponent, CountriesTableComponent],

  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TestComponent, HomePageComponent, CountriesTableComponent]
})
export class CovidBaseModule { }
