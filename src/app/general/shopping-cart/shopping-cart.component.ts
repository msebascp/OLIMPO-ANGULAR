import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { ShoppingService } from 'src/app/database/shopping.service';
import { Customer } from 'src/app/interfaces/customer';
import { Product } from 'src/app/interfaces/product';
import { Shopping } from 'src/app/interfaces/shopping';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public products: Shopping[] = []
  isLogin: boolean = false;
  customer: Customer | undefined;
  infoAuth!: { isLogin:boolean, isTrainer:boolean};
  @Input() total: number = 0;

  constructor (
    private shoppingService: ShoppingService,
    private auth: AuthPassportService,
    private router: Router
  ) { }

  ngOnInit(){
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
      this.infoAuth = infoAuth
    })
    this.dataCustomer();

  }

  public goToCheckout(): void {
    this.router.navigate(['/checkout'], { queryParams: { total: this.total } });
  }

  public getAllProducts(id_customer: number): void {
    this.shoppingService.getAllProducts(id_customer).subscribe(shoppingList => {
      for (let shopping of shoppingList) {
        this.products.push(shopping);
      }
      for (const product of this.products) {
        const totalPrice = this.calculateTotalPrice(product);
        this.total += totalPrice; // Sumar el total de cada producto al total general
      }
    });
  }

  public deleteItem(id_item: number): void {
    const product = this.products.find(p => p.id === id_item);
    if (product) {
      this.shoppingService.deleteProduct(id_item).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id_item);
        const totalPrice = this.calculateTotalPrice(product);
        this.total -= totalPrice; // Restar el total del producto eliminado al total general
      });
    }
  }
  
  public updateCantidad(id_item: number, cantidad: number): void {
    const product = this.products.find(p => p.id === id_item);
    if (product) {
      const oldTotalPrice = Number(product.product.price) * product.cantidad;
      product.cantidad = cantidad;
      const newTotalPrice = Number(product.product.price) * product.cantidad;
      this.total = this.total - oldTotalPrice + newTotalPrice;
  
      this.shoppingService.updateProduct(id_item, cantidad).subscribe();
    }
  }
  
  public calculateTotalPrice(product: any): number {
    return product.product.price * product.cantidad;
  }

  public dataCustomer() {
    this.auth.dataCustomer().subscribe(customer => {
      this.customer = customer;
      this.getAllProducts(customer.id);
    });
}

public endPoint() {
  if (this.infoAuth.isLogin && !this.infoAuth.isTrainer) {
    this.auth.endPointCustomer();
  } 

}
}
