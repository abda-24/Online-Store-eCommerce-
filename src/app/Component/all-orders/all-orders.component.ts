import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { ICart } from '../../core/services/Interface/icart';
import { DatePipe } from '@angular/common';
import { Iorders } from '../../core/services/Interface/iorders';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService)

  Orders: Iorders[] = [];

  ngOnInit(): void {
    const userId = '';
    this.GetUserOrders(userId);
  }


  GetUserOrders(id: string): void {
    this._OrdersService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.Orders = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
