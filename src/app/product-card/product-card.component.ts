import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {
  }

}
