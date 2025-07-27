import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IProduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.baseUrl}/products`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/products/${id}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${environment.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`${environment.baseUrl}/products/${id}`, product);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.baseUrl}/products/${id}`);
  }
}
