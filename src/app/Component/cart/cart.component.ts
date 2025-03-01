import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/services/Interface/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  CartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.GetProductCART().subscribe({
      next: (res) => {
        console.log(res.data); //! {Total Cart Price, products[{}]}
        this.CartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load cart details!',
        });
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.delateSpecficCartProducts(id).subscribe({
      next: (res) => {
        console.log(res);
        this.CartDetails = res.data;
        this._CartService.CartNumber.next(res.numOfCartItems);
        Swal.fire({
          icon: 'success',
          title: 'Item Removed!',
          text: 'The item has been removed from your cart.',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to remove the item!',
        });
      },
    });
  }

  UpdateCart(id: string, count: number): void {
    this._CartService.UpdateCartProductquantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.CartDetails = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Cart Updated!',
          text: 'Your cart has been updated successfully.',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update the cart!',
        });
      },
    });
  }

  ClearAllCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.ClearCart().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.CartDetails = {} as ICart;
              this._CartService.CartNumber.next(0);
              Swal.fire({
                icon: 'success',
                title: 'Cart Cleared!',
                text: 'Your cart has been cleared successfully.',
              });
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to clear the cart!',
            });
          },
        });
      }
    });
  }
}
