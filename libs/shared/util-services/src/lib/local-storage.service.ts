import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const LOCALSTORAGE_SERVICE = new InjectionToken<string>(
  'LocalStorageService'
);

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(value: string): void {
    localStorage.setItem(TOKEN, value);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }
}
