import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { Order } from '../orders/order';
import { ProductService } from './product.service';
import { OrderService } from '../orders/order.service';
import { SharedService } from '../utils/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  order: Order;

  constructor(private productService: ProductService, private orderService: OrderService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
    this.orderService.getOpenOrder().subscribe(
      order => {this.order = order; this.sharedService.productsInOrder = order.products.length; this.sharedService.openOrderId = order.id;}
    );
  }
  
  updateStockVisual(id: string, event: any): void {
    let quantity: number = event.target.value as number;
    this.products = this.products.map((item: Product) => {
      if (id == item.id) {
        if(item.stock >= quantity){
          item.quantitySelected = quantity;
          item.visualStock = item.stock - quantity;
        }else{
          item.quantitySelected = 0;
        }
      }
      return item;
    });
  }
  
  addProductToTheCar(id: string):void{
    this.products.map((item: Product) => {
      if (id == item.id) {
        this.productService.addProductToTheCar(id, item.quantitySelected);
      }
    });
    this.orderService.getOpenOrder();
  }

}
