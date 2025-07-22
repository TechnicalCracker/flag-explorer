import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailsComponent } from './country-details.component';
import { CountryService } from '../../services/country.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CountryDetailsComponent', () => {
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let component: CountryDetailsComponent;
  let mockCountryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    mockCountryService = jasmine.createSpyObj('CountryService', ['getCountryByName']);

    await TestBed.configureTestingModule({
      imports: [CountryDetailsComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        { provide: CountryService, useValue: mockCountryService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ name: 'Lesotho' })
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should fetch country details', () => {
    const mockDetails = {
      name: 'Lesotho',
      capital: 'Maseru',
      population: 2000000,
      flag: 'https://flagcdn.com/ls.png',
    };

    mockCountryService.getCountryByName.and.returnValue(of(mockDetails));

    fixture.detectChanges(); // ngOnInit runs here

    expect(component.countryDetails?.name).toBe('Lesotho');
    expect(component.countryDetails?.capital).toBe('Maseru');
  });
});