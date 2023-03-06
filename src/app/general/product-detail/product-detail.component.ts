import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public selectedProduct: Product = {id: 0, name: '', price: '', description: '', photo: '' }

  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getPostById()
  }

  public getPostById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;

      this.productService.getProductById(id).subscribe(product => {
        this.selectedProduct = product;
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
