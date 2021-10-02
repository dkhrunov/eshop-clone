import { Injectable } from '@angular/core';
import * as countriesLib from 'i18n-iso-countries';
import * as countryDataEn from 'i18n-iso-countries/langs/en.json';
import { of } from 'rxjs';

countriesLib.registerLocale(countryDataEn);

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries$ = of(countriesLib.getNames('EN', { select: 'official' }));
}
