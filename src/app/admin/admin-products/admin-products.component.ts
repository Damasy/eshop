import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$: Observable<any>;
  // products: Product[];
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  // tableResource: DataTableResource<any>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService ) {
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.products = this.filteredProducts = products;

      // this.initializeTable(products);
    });
  }

  // private initializeTable(Products) {
  //   this.tableResource = new DataTableResource(Products);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) { return; }
  //   this.tableResource.query(params)
  //   .then(items => this.items = items);
  // }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter (query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    // this.initializeTable(filteredProducts);
  }

}
