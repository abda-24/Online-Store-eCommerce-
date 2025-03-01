export interface Iorders {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ICartItem {
  count: number;
  product: IProduct;
  price: number;
  _id: string;
}

export interface IProduct {
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  id: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
