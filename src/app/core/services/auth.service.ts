import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



 private readonly _HttpClient = inject(HttpClient);
 private readonly _Router = inject(Router);
 UserDataToken:any = null;

 setRegisterFrom(data:object):Observable<any>
 {
     return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
 }

 SetLoginFrom(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)

 }

 SaveUserDataToken():void
 {
  if(localStorage.getItem('userToken') !== null)
  {
   this.UserDataToken = jwtDecode(localStorage.getItem('userToken')!)
   console.log("userData", this.UserDataToken); //& Delate this is not useful

  }
 }
logOut():void
{
  localStorage.removeItem('userToken');
  this.UserDataToken = null;
  this._Router.navigate(['/login'])
}


SetVerifyEmail(data:object):Observable<any>
{
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}


SetVerifyRestCode(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}

SetRestPassword(data:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}


}
