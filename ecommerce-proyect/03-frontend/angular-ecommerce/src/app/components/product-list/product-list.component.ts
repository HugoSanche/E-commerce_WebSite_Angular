
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product'
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryName: string = "";
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1; //used for pagination
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousKeyword:string="";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const thekeyword: string = this.route.snapshot.paramMap.get('keyword')?.trim()!;
   
    // if we have a different keyword than previous
    // then set thePageNumber to 1
    if (this.previousKeyword!=thekeyword){
        this.thePageNumber=1;
    }
    this.previousKeyword=thekeyword;
    console.log(`keyword=${thekeyword},thePageNumber=${this.thePageNumber}`);

    //now search for the products using keyword
    this.productService.searchProductPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              thekeyword).subscribe(this.processResult());

    //now search for the products using keyword
    this.productService.searchProducts(thekeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    //
    //Check if we have a different category then previous
    //Note:Angular will reuse a component if it is currently being viewed
    //

    // if we have a different categiry than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`);

    //now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,//spring begin pagination in 0
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());
  }
  updatePageSize(pageSize:string){
      this.thePageSize=+pageSize;
      this.thePageNumber=1;
      this.listProducts();
  }

  processResult(){
    return (data:any) =>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }
  addToCart(theProduct:Product){
    console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}` );
    //TODO ... do the real work
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}


