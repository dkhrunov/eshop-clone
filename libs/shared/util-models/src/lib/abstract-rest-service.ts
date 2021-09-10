import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  concatMap,
  merge,
  Observable,
  pluck,
  scan,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from '@env/environment';
import { DeleteResponse } from './delete-response';
import { CoreEntity } from '..';
import { isEntity } from './isEntityGuard';

@Injectable({
  providedIn: 'root',
})
export class AbstractRestService<E extends CoreEntity, D> {
  constructor(private http: HttpClient, private url: string) {}

  private resourceUrl = `${environment.baseUrlApi}/${this.url}`;

  private createSubject = new Subject<D>();
  createAction$ = this.createSubject.asObservable();

  private deleteSubject = new Subject<string>();
  deleteAction$ = this.deleteSubject.asObservable();

  private getSubject = new Subject<string>();
  getAction$ = this.getSubject.asObservable();

  private updateSubject = new Subject<{
    id: string;
    entity: E;
  }>();
  updateAction$ = this.updateSubject.asObservable();

  all$ = this.http.get<E[]>(this.resourceUrl);

  getById$ = this.getAction$.pipe(
    switchMap((id) => this.getResourceFromServer(id))
  );

  created$ = this.createAction$.pipe(
    concatMap((entity) => {
      return this.createResourceOnServer(entity);
    })
  );

  deleted$ = this.deleteAction$.pipe(
    concatMap((id) => this.deleteResourceOnServer(id))
  );

  updated$ = this.updateAction$.pipe(
    concatMap(({ id, entity }) => this.updateResourceOnServer(id, entity))
  );

  resources$ = merge(
    this.all$,
    this.created$,
    this.deleted$,
    this.updated$
  ).pipe(
    scan(
      (entities, entity) => this.modifyResourceArray(entities, entity),
      [] as E[]
    )
  );

  create(entity: D): void {
    this.createSubject.next(entity);
  }

  delete(id: string): void {
    this.deleteSubject.next(id);
  }

  getById(id: string): void {
    this.getSubject.next(id);
  }

  update(id: string, entity: E): void {
    this.updateSubject.next({ id, entity });
  }

  private createResourceOnServer(entity: D): Observable<E> {
    return this.http.post<E>(this.resourceUrl, entity);
  }

  private deleteResourceOnServer(id: string): Observable<string> {
    return this.http
      .delete<DeleteResponse>(`${this.resourceUrl}/${id}`)
      .pipe(pluck('entityDeleted'));
  }

  private updateResourceOnServer(id: string, entity: E): Observable<E> {
    return this.http.put<E>(`${this.resourceUrl}/${id}`, entity);
  }

  private getResourceFromServer(id: string): Observable<E> {
    return this.http.get<E>(`${this.resourceUrl}/${id}`);
  }

  private modifyResourceArray(entities: E[], value: unknown): E[] {
    if (Array.isArray(value)) {
      return this.mergeResources(entities, value);
    }

    if (typeof value === 'string') {
      return entities.filter((c) => c.id !== value);
    }

    if (isEntity(value)) {
      const exsitedResource = entities.find((item) => item.id === value.id);

      exsitedResource
        ? this.replaceResourceInList(entities, exsitedResource)
        : [...entities, value];
    }

    return entities;
  }

  private mergeResources(entities: E[], entityToAdd: E[]): E[] {
    return [...entities, ...entityToAdd];
  }

  private replaceResourceInList(entities: E[], entityForReplace: E): E[] {
    return entities.map((entity) => {
      if (entity.id === entityForReplace.id) {
        return {
          ...entity,
          ...entityForReplace,
        };
      }
      return entity;
    });
  }
}
