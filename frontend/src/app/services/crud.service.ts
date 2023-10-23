import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<TModel, TCreateData = {}, TUpdateData = {}> {
  /**
   * Endpoint's name without starting slash (`/`)
   *
   * @protected
   */
  protected abstract endpointName: string

  protected constructor(
    private http: HttpClient
  ) { }

  /**
   * Get list of a resource from server
   */
  public getList(): Observable<Array<TModel>> {
    return this.http.get<Array<TModel>>([environment.apiUrl, this.endpointName].join('/'))
  }

  /**
   * Get a resource by its id from server
   */
  public get(id: number): Observable<TModel> {
    return this.http.get<TModel>([environment.apiUrl, this.endpointName, id].join('/'))
  }

  /**
   * Create a new resource on the server
   */
  public create(input: TCreateData): Observable<TModel> {
    return this.http.post<TModel>([environment.apiUrl, this.endpointName].join('/'), input)
  }

  /**
   * Update an existing resource on the server
   */
  public update(id: number, input: TUpdateData): Observable<TModel> {
    return this.http.put<TModel>([environment.apiUrl, this.endpointName, id].join('/'), input)
  }

  /**
   * Delete an existing resource from the server
   */
  public delete(id: number): Observable<TModel> {
    return this.http.delete<TModel>([environment.apiUrl, this.endpointName, id].join('/'))
  }
}
