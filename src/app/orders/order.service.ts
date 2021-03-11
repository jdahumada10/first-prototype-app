import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { Order } from './order';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../users/auth.service';
import {Router} from '@angular/router';
import { OrderProduct } from './order-product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orderEndPoint: string = 'http://localhost:8090/prototype/v1.0/order';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  private _productsInOrder:number;
  
  constructor(private http: HttpClient, private authService:AuthService, private router: Router) { }
  
  getOrders(): Observable<Order[]> {
    
    if(!this.authService.isAuthenticated()){
      
      return of(new Array<Order>());
    }

    let user = this.authService.user;
    let url = this.orderEndPoint + "?" +'userId='+user.email;
    return this.http.get(url, {headers: this.addAuthorizationHeader()}).pipe(
      map((response:any) => {
        (response.object as Order[]).map(ord => {
          ord.id = ord.id;
          ord.totalValue = ord.totalValue;
          ord.status = ord.status;
          ord.products = (ord.products as OrderProduct[]).map( oprod  => {
            oprod.id = oprod.id;
            oprod.quantity = oprod.quantity;
            oprod.product = oprod.product;
            return oprod;
          }
          );
          return ord;
        });
        return response.object;
      })
    );
  }
  
  getOpenOrder(): Observable<Order>{
    if(!this.authService.isAuthenticated()){
      
      return of(new Order());
    }
    let user = this.authService.user;
    let url = this.orderEndPoint + "/open" + "?" +'userId='+user.email;
    return this.http.get(url, {headers: this.addAuthorizationHeader()}).pipe(
      map((response:any) => {
        return response.object;
      })
    );
  }
  
  private addAuthorizationHeader(){
    let token = this.authService.token;
    if (token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }
}
