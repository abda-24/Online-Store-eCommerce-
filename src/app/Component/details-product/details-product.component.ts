import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/services/Interface/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss',
})
export class DetailsProductComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute); //*Get all information about roating // id
  private readonly _ProductDetailsService = inject(ProductDetailsService);
  private readonly _CartService = inject(CartService);
  getSpesficProuctsUnsubscribe!: Subscription;
  deatielsProduct: Iproduct | null = null;

  carouselOptionsDetails: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    autoplayTimeout: 3000,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  ngOnInit(): void {
    this.getSpesficProuctsUnsubscribe = this._ActivatedRoute.paramMap.subscribe(
      {
        next: (res) => {
          let idProduct = res.get('id');
          //  & Call logic Api Specific Products
          this._ProductDetailsService.GetSpecificProduct(idProduct).subscribe({
            next: (res) => {
              console.log(res.data);
              this.deatielsProduct = res.data;
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.getSpesficProuctsUnsubscribe?.unsubscribe();
  }

  AddToCart(productId: string) {
    this._CartService.AddProductToCart(productId).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: 'The product has been added to your cart successfully.',
          confirmButtonText: 'OK',
          timer: 3000,
        });
      },
      error: (err) => {
        console.log('Error adding product to cart:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add the product to your cart. Please try again later.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
