import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);
  countNumber: number = 0;

  logOutFrom(): void {
    this._authService.logOut();
  }

  ChangeLanguage(lang: string): void {
    this._MyTranslateService.ChangeLanguceServise(lang);
  }
  ngOnInit(): void {
    this._CartService.GetProductCART().subscribe({
      next: (res) => {
        console.log('cartItem', res);
        this._CartService.CartNumber.next(res.numOfCartItems);
      },
    });
    this._CartService.CartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
      },
    });
  }
}
