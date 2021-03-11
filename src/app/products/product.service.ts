import { Injectable } from '@angular/core';
import { Product } from './product';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../users/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productEndPoint: string = 'http://localhost:8090/prototype/v1.0/product';
  private orderEndPoint: string = 'http://localhost:8090/prototype/v1.0/order';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private authService:AuthService, private router: Router) { }

  getProducts(): Observable<Product[]> {

    return this.http.get(this.productEndPoint).pipe(
      map((response:any) => {
        (response.object as Product[]).map(prod => {
          prod.id = prod.id;
          prod.name = prod.name;
          prod.description = prod.description;
          prod.value = prod.value;
          prod.stock = prod.stock;
          prod.visualStock = prod.stock;
          return prod;
        });
        return response.object;
      })
    );
  }
  
  addProductToTheCar(id:string, quantity:number):void{
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/login']);
      return;
    }
    let user = this.authService.user;
    let params = new URLSearchParams();
    let url = this.orderEndPoint + "?" +'productId='+id+'&'+'quantity='+quantity.toString()+'&'+'userId='+user.email;
    this.http.post(url, params, {headers: this.addAuthorizationHeader()}).subscribe(data => {
        swal('Product successfully added to the shopping cart', quantity.toString()+" units added.", 'success');
    });
  }
  
  private addAuthorizationHeader(){
    let token = this.authService.token;
    if (token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }
}
