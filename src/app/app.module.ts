import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './global/components/header/header.module';
import {HttpErrorInterceptor} from './global/utils/http-interceptor';
import {WEBSITE_FEATURE_KEY} from './store/reducers/website.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {REDUCER_TOKEN} from './store/reducers';
import {websiteEffects} from './store/effects';

export interface AppState {
  [WEBSITE_FEATURE_KEY]: any;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      audience: environment.audience,
      httpInterceptor: {
        allowedList: [
          `${environment.urlService}/${environment.blocklistService}`,
          `${environment.urlService}/${environment.blocklistService}/*`
        ],
      },
    }),
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([...websiteEffects]),
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HeaderModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
  ],
})
export class AppModule {
}
