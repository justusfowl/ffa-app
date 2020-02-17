import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    apiUrl: string ="";

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

  constructor(
    private http: HttpClient, 
    private router: Router

    ) {

      this.apiUrl = environment.apiProtocol + '://' + environment.apiBase + ':' + environment.apiPort + "/api/v" + environment.apiVersion;
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userData')));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   initService(){
   
   }

   
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


   setUser(userData){
    this.currentUserSubject.next(userData);
   }

   updateProfile(userData){
    return this.http.put<any>(`${this.apiUrl}/profile/user`, { "user": userData })
      .pipe(map( (resp : any) => {

          localStorage.setItem('userData', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
          
          return userData;
      }));
   }

   login(userName, password) {

    return this.http.post<any>(`${this.apiUrl}/auth/login`, { userName, password })
        .pipe(map( (resp : any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let userData = resp.data; 

            localStorage.setItem('userData', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
            return userData;
        }));

    }

    logout(){
      localStorage.removeItem('userData');
      this.currentUserSubject.next(null);
      this.router.navigate(["/login"], { replaceUrl: true });
    }

  isAuthorized(){
    if (this.currentUserValue) {
        return true;
    }else{
        return false;
    }
  }

  public get token(){
    let userObj = JSON.parse(localStorage.getItem('userData'));
    return userObj.token;
  }

}
