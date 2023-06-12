import { Component } from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { ShoppingService } from 'src/app/database/shopping.service';
import { Customer } from 'src/app/interfaces/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public products: Product[] = [];
  isLogin: boolean = false;
  customer: Customer;
  infoAuth!: { isLogin:boolean, isTrainer:boolean};
  constructor (
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
}
