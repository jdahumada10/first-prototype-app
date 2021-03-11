import { Injectable } from '@angular/core';
import { PaymentInfo } from './paymentinfo';
import { SharedService } from '../utils/shared.service';
import { AuthService } from '../users/auth.service';
import { OrderService } from '../orders/order.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './Transaction';
import { SavedPayment } from './savedpayment';
import { TokenizedCard } from './tokenized-card';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private transactionEndPoint: string = 'http://localhost:8090/prototype/v1.0/transaction';
  private userEndPoint: string = 'http://localhost:8090/prototype/v1.0/user';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient,public orderService: OrderService,public authService: AuthService,public sharedService:SharedService) { }
  
  savePaymentMethod(paymentInfo:PaymentInfo):void{
    let user = this.authService.user;
    let url = this.userEndPoint + "/savePaymentMethod" + "?" +'userId='+user.email;
    this.http.post(url, paymentInfo, {headers: this.addAuthorizationHeader()}).pipe(
      map( (response:any) => {
        return this.processSavePaymentResponse(response.object as any);
      })
    ).subscribe();
  }
  
  processSavePaymentResponse(response:any):void{
    if(response.status == '200'){
      swal('Payment Method Saved', "Your payment method was saved in the database.", "success");
    }else{
      swal('Error saving payment', "Your payment method was not saved in the database.", "error");
    }
  }

  payNew(paymentInfo:PaymentInfo):void{
    let orderId = this.sharedService.openOrderId;
    let user = this.authService.user;
    let url = this.transactionEndPoint + "/checkoutOrderNewPaymentInfo" + "?" +'userId='+user.email+'&'+'orderId='+orderId;
    this.http.post(url, paymentInfo, {headers: this.addAuthorizationHeader()}).pipe(
      map( (response:any) => {
        return this.processResponse(response.object as Transaction, paymentInfo.save);
      })
    ).subscribe();
    if(paymentInfo.save){
      this.savePaymentMethod(paymentInfo);
    }
    this.orderService.getOpenOrder();
  }
  
  private processResponse(transaction:Transaction, save:boolean):Transaction{
    if(transaction.state == "APPROVED"){
      swal('Successful Transaction', 'Your transaction has been approved. Transaction Id:'+transaction.id+'\n Traceability code: '+transaction.traceabilityCode+' Authorization code: '+transaction.authorizationCode, 'success');
    }else{
      swal('Declined Transaction', 'Your transaction has been declined. Transaction Id:'+transaction.id+'\n Traceability code: '+transaction.traceabilityCode+' Order id: '+transaction.authorizationCode, 'error');
    }
    return transaction;
  }

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if (token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }
  
  getPayments(): Observable<SavedPayment[]> {
    
    let user = this.authService.user;
    let url = this.userEndPoint+"/paymentMethods?userId="+user.email;
    return this.http.get(url).pipe(
      map((response:any) => {
        (response.object as SavedPayment[]).map(payment => {
          payment.id = payment.id;
          payment.tokenizedCard = (payment.tokenizedCard as TokenizedCard);
          return payment;
        });
        return response.object;
      })
    );
  }
}
