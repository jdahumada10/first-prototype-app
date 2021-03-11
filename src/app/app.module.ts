import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './products/product.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchboxComponent } from './header/searchbox/searchbox.component';
import { ButtonsComponent } from './header/buttons/buttons.component';
import { LoginComponent } from './users/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from './orders/order.service';
import { SharedService} from './utils/shared.service';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckoutformComponent } from './shoppingcart/checkoutform.component';
import { MethodComponent } from './shoppingcart/method.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shoppingCart', component: ShoppingcartComponent },
  { path: 'shoppingCart/pay', component: CheckoutformComponent },
  { path: 'shoppingCart/chooseMethod', component: MethodComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    SearchboxComponent,
    ButtonsComponent,
    LoginComponent,
    OrdersComponent,
    ShoppingcartComponent,
    CheckoutformComponent,
    MethodComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService,
    OrderService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
