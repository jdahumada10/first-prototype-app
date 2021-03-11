import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/order';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  
  order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOpenOrder().subscribe(
      order => this.order = order
    );
  }

}
