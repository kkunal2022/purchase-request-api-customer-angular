import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API_URL = 'http://localhost:8080/api/products/';

  constructor(private httpClient: HttpClient) {}

  getProductDetail(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('${this.API_URL}/${id}');
  }
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL, product);
  }
  updateProduct(id: number, product: Product) {
    return this.httpClient.put<Product>('${this.API_URL}/${id}', product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>('${this.API_URL}/${id}');
  }
}
