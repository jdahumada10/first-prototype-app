import { Order } from '../orders/order';

export class User {
  email: string;
  password: string;
  roles: string[];
  orders: Order[];
  order: Order;
}
