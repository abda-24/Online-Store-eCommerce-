import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService{


private readonly _HttpClient = inject(HttpClient);

getAllProducts(page: number = 1, limit: number = 40):Observable <any>
{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
}

GetSpecificProduct(id: string | null): Observable<any> {
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
}


}



