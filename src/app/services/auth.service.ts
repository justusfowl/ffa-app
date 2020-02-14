import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataservice';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

  constructor(
    private http: HttpClient, 
    private dataSrv : DataService, 
    private router: Router

    ) {
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
    return this.http.put<any>(`${this.dataSrv.apiUrl}/profile/user`, { "user": userData })
      .pipe(map( (resp : any) => {

          localStorage.setItem('userData', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
          
          return userData;
      }));
   }

   login(userName, password) {

    return this.http.post<any>(`${this.dataSrv.apiUrl}/auth/login`, { userName, password })
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

}
