import { Product } from '../products/product';
import { OrderProduct } from './order-product'

export class Order {
  id: string;
  status: string;
  totalValue: number;
  products: OrderProduct[];
}
