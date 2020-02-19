import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { DataService } from './dataservice';
import { TranslateConfigService } from './translate-config.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private dataSrv : DataService, 
        private translateCfg: TranslateConfigService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            console.error(err); 
            // define whether specific actions have happpened for individual errors e.g. redirect for login
            // then subsequently no other message should happen
            let flagHasActionHappened = false;

            if ((err.status === 401 || err.status === 403) && err.url.indexOf("login") == -1) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
                flagHasActionHappened = true;
            }else if (err.status == 440){
                // @TODO: implement a renew Token functionality : this.authenticationService.renewToken();
                this.dataSrv.showToast(this.translateCfg.translate.instant("TOKEN_EXPIRED"));
                this.authenticationService.logout();
                flagHasActionHappened = true;
            }
            
            const error = {
                "err" : err,
                "message" : err.error.message || err.statusText, 
                "flagHasActionHappened" : flagHasActionHappened
            };

            return throwError(error);
        }))
    }
}