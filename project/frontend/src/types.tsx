export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: number;
  rating_count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Rating {
  productId: number;
  rating_rate: number;
  rating_count: number;
}

export interface Review {
  id: number;
  username: string;
  productId: number;
  message: string | null;
  rating: number;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  mail: string;
  phone: string | null;
}

export interface Address {
  country: string;
  city: string;
  zipCode: string;
  street: string;
  houseNumber: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  orderId: number;
  userId: number;
  orderDate: Date;
  sentDate: Date | null;
  inDate: Date | null;
  items: OrderItem[];
  shipment: {
    method: string;
    cost: number;
  };
  address: Address;
  contact: string;
}
