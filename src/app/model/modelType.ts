// export type SignUp = { fname: string, lname: string, email: string, password: string };
export interface SignUp {
    fname: string,
    lname: string,
    email: string,
    password: string
};

export interface Login {
    email: string,
    password: string
}

export interface Product {
    id: string,
    name: string,
    price: string,
    category: string,
    color: string,
    description: string,
    imgUrl: string,
    quantity: undefined | number,
}

export interface Cart {
  id?: string,
  userId: string,
  productId: string,
  quantity: number,
}

export interface PriceSummary{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface Order{
  id: string | undefined,
  email: string,
  address: string,
  contact: string,
  totalPayableAmount: number,
  userId: number
}
