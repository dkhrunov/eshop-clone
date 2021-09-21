import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

export const usernameValidator = (): AsyncValidatorFn => {
  const injector = Injector.create({
    providers: [
      { provide: HttpClient, useClass: HttpClient, deps: [HttpClientModule] },
    ],
  });
  const http = injector.get(HttpClient);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return http
      .get<boolean>(
        `${environment.baseUrlApi}/api/users/check?email=${control.value}`
      )
      .pipe(
        map((res) => {
          return res ? { usernameExists: true } : null;
        })
      );
  };
};
