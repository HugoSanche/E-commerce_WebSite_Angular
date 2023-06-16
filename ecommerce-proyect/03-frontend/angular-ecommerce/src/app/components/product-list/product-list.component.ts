
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product'
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
  thePageSize: number = 50;
  theTotalElements: number = 0;



  constructor(private productService: ProductService,
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
    const thekeyword: string = this.route.snapshot.paramMap.get('keyword')!;
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
      .subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1; //Angular begins pagination in 1 
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      );



  }
}
