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
    imgUrl: string
}