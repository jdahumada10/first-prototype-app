import { Component, OnInit } from '@angular/core';
import { User } from './user';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {OrderService} from '../orders/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = "Log In";
  user: User;

  constructor(private authService: AuthService, private router: Router, private orderService: OrderService) { 
    this.user = new User();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      if(this.authService.user.roles.indexOf('ROLE_USER') > -1){
        this.router.navigate(['/products'])
      }else{
        this.router.navigate(['/products'])
      }
    }
  }
  
  login():void{
    if(this.user.email == null || this.user.password == null){
      swal('Error Login', 'Empty username or password','error')
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      this.orderService.getOrders();
      this.router.navigate(['products']);
      swal('Successful Login', 'You are now logged in!', 'success');
    },err => {
      if (err.status == 400) {
        swal('Error Login', 'The credentials provided are wrong!', 'error');
      }
    }
  );
  }

}
