import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule, Route, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryDetails } from '../../models/country-details.model';
import { CountryService } from '../../services/country.service';

declare var window: any;

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {

  countryDetails?: CountryDetails;
  name?: string | undefined;
  responseMessage: string = '';

  errorMessage = '';

  constructor(
   
     private route: ActivatedRoute,
     private countryService: CountryService,
  ) { 
  
  }

  ngOnInit(): void {
   
    this.route.params.subscribe((params: any) => {

      this.name = params['name'];

    });
    this.getCountryDetails();
  }

  getCountryDetails(): void { 
    this.countryService.getCountryByName(this.name).subscribe({
      next: data => {
        this.countryDetails = data;
       
      },
      error: err => {
        this.errorMessage = err.error.message;
       
      }
    });
  }
}