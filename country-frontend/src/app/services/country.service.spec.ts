import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Country } from '../models/country.model';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch countries from backend', () => {
    const mockCountries: Country[] = [
      { name: 'Uruguay', flag: 'https://flagcdn.com/uy.png' },
      { name: 'Nepal', flag: 'https://flagcdn.com/np.png' },
    ];

    service.getAllCountries().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries[1].name).toBe('Nepal');
    });

    const req = httpMock.expectOne('http://localhost:8080/countries');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });
});