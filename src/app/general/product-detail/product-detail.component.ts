import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DatabaseService} from "../../database/database.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public selectedProduct!: Product;

  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getPostById()
  }

  public getPostById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;

      this.databaseService.getProductById(id).subscribe(product => {
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
