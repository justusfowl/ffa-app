import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  language = new Subject();

  constructor(
    public translate: TranslateService
  ) {
    
   }

  getDefaultLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }
 
  setLanguage(setLang) { 
    this.translate.use(setLang);
    this.language.next(setLang)
  }

}
