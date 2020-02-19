import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsPageModule } from './settings/settings.module';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateConfigService } from './services/translate-config.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
import { DatePipe } from '@angular/common';
import { PipesModule } from './services/pipes.module';
import { ProfilePageModule } from './profile/profile.module';
import { CoachchatPageModule } from './coach/coachchat/coachchat.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DataService } from './services/dataservice';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './services/jwt.intercept';
import { ErrorInterceptor } from './services/error.intercept';

import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.apiProtocol + '://' + environment.apiBase + ':' + environment.apiPort, options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    TranslateModule.forRoot({ 
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule, 
    SocketIoModule.forRoot(config),

    SettingsPageModule, 
    ProfilePageModule,
    CoachchatPageModule,
    PipesModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    TranslateConfigService, 
    DatePipe, 
    DataService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
