import { Routes } from '@angular/router';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'countries/:name', component: CountryDetailsComponent }
];
