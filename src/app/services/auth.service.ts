import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

  constructor(

    ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userData')));
        this.currentUser = this.currentUserSubject.asObservable();
   }

   initService(){
   
   }

   setUser(userData){
    this.currentUserSubject.next(userData);
   }




}
