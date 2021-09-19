import { Inject, Injectable } from '@angular/core';
import { PRODUCTS_URL } from './productsUrl.token';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, Subject } from 'rxjs';
import { UploadImageResponse } from '@esc/product/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  uploadUrl = `${environment.baseUrlApi}`;

  constructor(private http: HttpClient) {}

  private uploadImageSubject = new Subject<FormData>();
  uploadImageAction$ = this.uploadImageSubject.asObservable();

  uploadedImageUrl$ = this.uploadImageAction$.pipe(
    concatMap((image) => this.uploadImageOnServer(image))
  );

  uploadImage(image: FormData): void {
    this.uploadImageSubject.next(image);
  }

  private uploadImageOnServer(
    image: FormData
  ): Observable<UploadImageResponse> {
    return this.http.post<UploadImageResponse>(
      `${this.uploadUrl}/uploads`,
      image
    );
  }
}
