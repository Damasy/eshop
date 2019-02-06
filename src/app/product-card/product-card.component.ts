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
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    return this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity () {
    if (!this.shoppingCart) { return 0; }
    const item =  this.shoppingCart.payload.val().items[this.product.key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
  }

}
