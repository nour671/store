// import { ICart } from 'src/app/core/interfaces/cart.interface';


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ICart } from '../../../shared/interfaces/icart';
// import { ICartProduct } from '../../../shared/interfaces/icart';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(userId: number, productId: number, quantity: number): Observable<any> {
    const body = {
      userId: userId,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      products: [
        {
          productId: productId,
          quantity: quantity
        }
      ]
    };

    return this.httpClient.post(`${environment.baseUrl}/carts`, body);
  }

  getUserCart(cartId: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/carts/${cartId}`);
  }

  getAllCarts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/carts`);
  }

  deleteCart(cartId: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/carts/${cartId}`);
  }

  getLoggedUserCart(userId: number, number: any): Observable<ICart> {
  return this.httpClient.get<ICart>(`${environment.baseUrl}/carts/user/${userId}`)
}

removeSpecificCartItem(cart: any, productId: number): Observable<any> {
  const updatedProducts = cart.products.filter((p: any) => p.productId !== productId);
  const body = {
    ...cart,
    products: updatedProducts
  };
  return this.httpClient.put(`${environment.baseUrl}/carts/${cart.id}`, body);
}

updateCartQuantity(cart: any, productId: number, newQuantity: number): Observable<any> {
  const updatedProducts = cart.products.map((p: any) =>
    p.productId === productId ? { ...p, quantity: newQuantity } : p
  );
  const body = {
    ...cart,
    products: updatedProducts
  };
  return this.httpClient.put(`${environment.baseUrl}/carts/${cart.id}`, body);
}
}

