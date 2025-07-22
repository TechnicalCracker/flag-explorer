import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country } from '../models/country.model';
import { environment } from '../environments/environment';
import { CountryDetails } from '../models/country-details.model';

@Injectable({ providedIn: 'root' })
export class CountryService {


    errorMessage = '';
    constructor(private http: HttpClient,
        private router: Router) { }


    getAllCountries() {
        
        return this.http.get<Country[]>(`${environment.apiUrl}`)
            .pipe(map(res => {

                return res;
            }));
    }

    getCountryByName(name: string | undefined) {
        
        return this.http.get<CountryDetails>(`${environment.apiUrl}/${name}`)
            .pipe(map(res => {

                return res;
            }));
    }
}