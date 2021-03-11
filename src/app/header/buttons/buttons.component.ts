import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../users/auth.service';
import { SharedService } from '../../utils/shared.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  constructor(public authService:AuthService, public sharedService:SharedService) {
  }

  ngOnInit(): void {
  }
  
  logout():void{
    
    this.authService.logout();
  }

}
