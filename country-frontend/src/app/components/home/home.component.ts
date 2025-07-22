import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule, Route, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

declare var window: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  countries: Country[] = [];
  responseMessage: string = '';

  errorMessage = '';


  constructor(
   private router: Router,
   private countryService: CountryService,
  ) { 
   
  }

  ngOnInit(): void {
   
    this.getAllCountries();
  }

  getAllCountries() {
  this.countryService.getAllCountries().subscribe({
    next: (countries) => {
      this.countries = countries;
    },
    error: (err) => {
      // FIX: Safely access error message
      this.errorMessage = err?.message ?? 'API unavailable';
    }
  });
}

  openCountryDetails(name: string | undefined): void {
    if (name) {
      this.router.navigate(['/countries', name]);
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}