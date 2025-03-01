import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null)
  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      let SavedDataLocalStorge = localStorage.getItem('lang');
    this._TranslateService.setDefaultLang('en');
   if(SavedDataLocalStorge !==null)
   {
    this._TranslateService.use(SavedDataLocalStorge!)
   }
    this.ChangeDetraction();
  }

    }

ChangeDetraction():void{
  let SavedDataLocalStorge = localStorage.getItem('lang');
  if(SavedDataLocalStorge === 'en')
    {
      this._Renderer2.setAttribute(document.documentElement ,'dir', 'ltr' )
      this._Renderer2.setAttribute(document.documentElement ,'lang', 'en' )
    }else if(SavedDataLocalStorge === 'ar'){
       this._Renderer2.setAttribute(document.documentElement, 'dir' , 'rtl')
       this._Renderer2.setAttribute(document.documentElement ,'lang', 'ar' )
    }
}
ChangeLanguceServise(lang:string):void
{
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      localStorage.setItem('lang',lang); //!Save languge
      this._TranslateService.use(lang);
      this.ChangeDetraction();
    }
}

  }

