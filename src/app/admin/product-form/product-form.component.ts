import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product$ = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // this.product$ = this.productService.getProduct(id).snapshotChanges();
      this.productService.getProduct(id).valueChanges().pipe(take(1)).subscribe(p => this.product$ = p);
      console.log(id, 'id', this.product$, 'this.product$');
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
