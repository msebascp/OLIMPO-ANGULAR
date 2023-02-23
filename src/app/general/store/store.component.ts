import { Component } from '@angular/core';
import {Blog} from "../../interfaces/blog";
import {DatabaseService} from "../../database/database.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public products: Product[] = []

  constructor (
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }


  public getAllProducts(): void {
    this.databaseService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }
}
