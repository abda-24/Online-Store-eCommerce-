import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategoriesService {

  private readonly _HttpClient = inject(HttpClient);

  GetAllCategories():Observable <any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }


  GetSpasticCategories(id:string):Observable <any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories ${id}`)
  }

}
