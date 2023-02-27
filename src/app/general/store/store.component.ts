import { Component } from '@angular/core';
import {Blog} from "../../interfaces/blog";
import {DatabaseService} from "../../database/database.service";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";
import {AuthPassportService} from "../../database/auth-passport.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public products: Product[] = []

  constructor (
    private productService: ProductService,
    private auth:AuthPassportService
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.auth.checkDouble().subscribe(data  => console.log(data))
  }


  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }
}
