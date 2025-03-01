import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


 private readonly _HttpClient = inject(HttpClient)
CartNumber:BehaviorSubject<number>= new BehaviorSubject(0)

 AddProductToCart(id:string):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
    {
      productId:id
    },
   {

   }
  )
 }
 GetProductCART():Observable <any>
 {
return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,



)
 }
 delateSpecficCartProducts(id: string): Observable<any> {
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` ,

  );
}

UpdateCartProductquantity(id:string , newCount:number):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count" :newCount
    },

  )
}
ClearCart():Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,

  )
}




}
