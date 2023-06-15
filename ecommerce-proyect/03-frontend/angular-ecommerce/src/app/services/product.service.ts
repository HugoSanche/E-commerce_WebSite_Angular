import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 
  private productUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{

    //need to build URL based on category id !
    const searchUrl=`${this.productUrl}/search/findByCategoryId?id=${theCategoryId}`;

    //se le asigna la variable que tiene la busqueda en este caso "searchUrl"
    return this.getProducts(searchUrl);
  }
  searchProducts(thekeyword: string) {
      //need to build URL based on category id !
      const searchUrl=`${this.productUrl}/search/findByNameContaining?name=${thekeyword}`;

      //se le asigna la variable que tiene la busqueda en este caso "searchUrl"
      return this.getProducts(searchUrl);
  }
  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]> {
    

       //se le asigna la variable que tiene la busqueda en este caso "searchUrl"
       return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
         map(response=>response._embedded.productCategory)
       );
  }


}
interface GetResponseProducts{
    _embedded:{
        products:Product[];
    }
}
interface GetResponseProductCategory{
  _embedded:{
      productCategory:ProductCategory[];
  }
}
