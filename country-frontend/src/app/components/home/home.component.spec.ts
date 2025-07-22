import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { HomeComponent } from './home.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

describe('HomeComponent (Standalone)', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;

  const mockCountries: Country[] = [
    { name: 'Laos', flag: 'https://flagcdn.com/la.png' },
    { name: 'Suriname', flag: 'https://flagcdn.com/sr.png' },
  ];

  beforeEach(async () => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAllCountries']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', fakeAsync(() => {
    countryServiceSpy.getAllCountries.and.returnValue(of(mockCountries));

    component.ngOnInit();
    tick();

    expect(component.countries.length).toBe(2);
    expect(component.countries[0].name).toBe('Laos');
    expect(component.countries[1].flag).toContain('sr.png');
  }));

  it('should handle API failure and set error message', fakeAsync(() => {
    const error = new Error('Service down');
    countryServiceSpy.getAllCountries.and.returnValue(throwError(() => error));

    component.ngOnInit();
    tick();

    expect(component.errorMessage).toContain('Service down');
    expect(component.countries.length).toBe(0);
  }));
});