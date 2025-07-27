// export interface ICartProduct {
//   productId: number;
//   quantity: number;
// }

// export interface ICart {
//   id?: number;
//   userId: number;
//   date: string;
//   products: ICartProduct[];
// }







export interface ICart {
  id: number;
  userId: number;
  date: string;
   products: {
    productId: number;
    quantity: number;
  }[];
  // products: Product[];
  __v: number;
}

interface Product {
  productId: number;
  quantity: number;
}
// export interface ICart {
//   _id: string;
//   cartOwner: string;
//   products: Product2[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   totalCartPrice: number;
// }

// export interface Product2 {
//   count: number;
//   _id: string;
//   product: Product;
//   price: number;
// }

// export interface Product {
//   subcategory: Subcategory[];
//   _id: string;
//   title: string;
//   quantity: number;
//   imageCover: string;
//   category: Category;
//   brand: Category;
//   ratingsAverage: number;
//   id: string;
// }

// export interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
// }

// export interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
//   category: string;
// }
