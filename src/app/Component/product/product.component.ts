import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Iproduct } from '../../core/services/Interface/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _ProductDetailsService = inject(ProductDetailsService);
  private readonly _CartService = inject(CartService);
  productList: Iproduct[] = [];
  getAllProductUnsubscribe!: Subscription;
  isLoading: boolean = false;
  currentPage: number = 1;
  numberOfPages: number = 1;
  limit: number = 40;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.getAllProductUnsubscribe = this._ProductDetailsService.getAllProducts(this.currentPage, this.limit).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = [...this.productList, ...res.data];
        this.numberOfPages = res.metadata.numberOfPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  loadMoreProducts(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  ngOnDestroy(): void {
    this.getAllProductUnsubscribe?.unsubscribe();
  }

  AddToCart(id: string): void {
    this._CartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.CartNumber.next(res.numOfCartItems)


        // Display success SweetAlert2 popup
        Swal.fire({
          icon: 'success',
          title: 'ElbannaTech',
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



      }
    });
  }

}
