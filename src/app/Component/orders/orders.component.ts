import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  CartId:string | null='';

  orders: FormGroup = this.fb.group({
    details: [null, [
      RxwebValidators.required(),
    ]],
    phone: [null, [
      RxwebValidators.required(),
      RxwebValidators.pattern({ expression: { pattern: /^01[0125][0-9]{8}$/ } })
    ]],
    city: [null, [
      RxwebValidators.required(),
    ]]
  });


  get formControls() {
    return this.orders.controls;
  }


  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(prams)=>{
          this.CartId = prams.get('id')
          console.log(this.CartId);

        }
      })
  }

  OrdersSubmit():void
  {
    console.log(this.orders.value);
    this._OrdersService.CheckOut(this.CartId, this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success' )
        {
          window.open( res.session.url,'_self'); //!url stripe payment
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

}
