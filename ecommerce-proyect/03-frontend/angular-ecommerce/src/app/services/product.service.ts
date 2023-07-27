import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl=environment.myproyectsApiUrl+'/products';
  private categoryUrl=environment.myproyectsApiUrl+'/product-category';
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    //need to build URL based on product id
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  getProductListPaginate(thePage:number,
                          thePageSize:number,
                          theCategoryId:number
                          ): Observable<GetResponseProducts>{
    console.log('Antes del error');
    //need to build URL based on category id, page and size !
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId:number): Observable<Product[]>{

    //need to build URL based on category id !
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    //se le asigna la variable que tiene la busqueda en este caso "searchUrl"
    return this.getProducts(searchUrl);
  }
  searchProducts(thekeyword: string) {
      //need to build URL based on category id !
      const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`;

      //se le asigna la variable que tiene la busqueda en este caso "searchUrl"
      return this.getProducts(searchUrl);
  }

  searchProductPaginate(thePage:number,
                        thePageSize:number,
                        thekeyword:string): Observable<GetResponseProducts>{

  //need to build URL based on keyword, page and size !
  const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`
                  +`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
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
    },
    page:{
      size:number,
      totalElements: number,
      totalPages:number,
      number:number
    }
}
interface GetResponseProductCategory{
  _embedded:{
      productCategory:ProductCategory[];
  }
}
