import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const TOKENSTORAGE_SERVICE = new InjectionToken<string>(
  'TokenStorageService'
);

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
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
