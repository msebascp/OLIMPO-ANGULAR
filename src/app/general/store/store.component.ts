import { Component } from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public products: Product[] = []

  constructor (
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      for (let product of products){
        let priceFloat: number = parseFloat(product.price)
        let priceFormatted = priceFloat.toFixed(2)
        product.price = priceFormatted.toString()
        this.products.push(product)
      }
    })
  }
}
