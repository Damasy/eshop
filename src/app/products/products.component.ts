import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // products$;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
  ) {
    // this.products = this.productService.getAll();
    productService.getAll()
      .pipe(
        switchMap(products => {
        this.products = products;

        return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(product => product.payload.val().category === this.category) :
          this.products;
      });


  }

  ngOnInit() {
  }

}
