import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppinCartService: ShoppingCartService
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

  async ngOnInit() {
    this.cart$ = await this.shoppinCartService.getCart();
  }

  ngOnDestroy() {}

}
