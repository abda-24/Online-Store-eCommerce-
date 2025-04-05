import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { Iproduct } from '../../core/services/Interface/iproduct';
import { Subscription } from 'rxjs';
import { GetAllCategoriesService } from '../../core/services/get-all-categories.service';
import { ICategories } from '../../core/services/Interface/getAllcategories';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TextTermPipePipe } from '../../core/pipes/text-term-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    FormsModule,
    RouterLink,
    SalePipe,
    TextTermPipePipe,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductDetailsService = inject(ProductDetailsService);
  private readonly _GetAllCategoriesService = inject(GetAllCategoriesService);
  private readonly _CartService = inject(CartService);

  productList: Iproduct[] = [];
  categoryList: ICategories[] = [];
  slides: string[] = [];
  getAllProductUnsubscribe!: Subscription;
  TextSearch: string = '';

  // & SliderMain


  // * SliderMan Categories

  MaincustomOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    rtl: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };





  customOptions:OwlOptions= {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000, // Faster transitions
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    },
    nav: true
  };


  ngOnInit(): void {
    this._GetAllCategoriesService.GetAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data; //& [Array of object]
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getAllProductUnsubscribe = this._ProductDetailsService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.productList = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.getAllProductUnsubscribe?.unsubscribe();
  }

  AddToCart(id: string): void {
    this._CartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.CartNumber.next(res.numOfCartItems);

        // Display success SweetAlert2 popup
        Swal.fire({
          icon: 'success',
          title: 'ElbannaStore',
          text: res.message, // Message from the API response
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
        console.error(err);

        // Display error SweetAlert2 popup
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add product!', // Custom error message
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
