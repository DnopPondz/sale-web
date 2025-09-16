import { Product } from './Product';
import { Order } from './Order';
import { User } from './User';
import { Promotion } from './Promotion';
import { Coupon } from './Coupon';

const modelsMap = {
  products: Product,
  orders: Order,
  users: User,
  promotions: Promotion,
  coupons: Coupon,
};

export function getModel(resource) {
  return modelsMap[resource];
}
