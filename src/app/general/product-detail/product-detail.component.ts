import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { ShoppingService } from 'src/app/database/shopping.service';
import { Customer } from 'src/app/interfaces/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public selectedProduct: Product = {id: 0, name: '', price: '', description: '', photo: '' }
  infoAuth!: { isLogin:boolean, isTrainer:boolean};
  isLogin: boolean = false;
  customer: Customer;
  
  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private auth: AuthPassportService,
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
      this.infoAuth = infoAuth
    })
    this.dataCustomer();
    this.getProductById()
  }

  public getProductById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;

      this.productService.getProductById(id).subscribe(product => {
        this.selectedProduct = product
        let priceFloat: number = parseFloat(this.selectedProduct.price)
        let priceFormatted = priceFloat.toFixed(2)
        this.selectedProduct.price = priceFormatted.toString()
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }


  public dataCustomer() {
    if (this.infoAuth.isLogin && !this.infoAuth.isTrainer) {
    this.auth.dataCustomer().subscribe(customer => {
      this.customer = customer;
    });
  }
  }
  

public endPoint() {
  if (this.infoAuth.isLogin && !this.infoAuth.isTrainer) {
    this.auth.endPointCustomer();
  } 
}

  public addShoppingProduct(id_product: number): void {
    this.shoppingService.createProduct(id_product, this.customer.id).subscribe( _ => {
      Swal.fire({
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
