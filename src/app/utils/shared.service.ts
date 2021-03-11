import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  productsInOrder:number;
  openOrderId:string;

  constructor() { }
}
