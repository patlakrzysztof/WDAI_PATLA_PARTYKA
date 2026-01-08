export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  person: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  mail: string;
  phone: string | null;
  address: Address | null;
}

export interface Address {
  country: string;
  city: string;
  zipCode: string;
  street: string;
  houseNumber: number;
  flatNumber: number | null;
}
