import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptors/errors.interceptor'
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions(),
  withInMemoryScrolling({scrollPositionRestoration:"top"}),withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor, errorsInterceptor,loadingInterceptor])),
    provideAnimations(),
   provideToastr(),
   importProvidersFrom(
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  )
     //?Slider OwalCursol

  ]
};
