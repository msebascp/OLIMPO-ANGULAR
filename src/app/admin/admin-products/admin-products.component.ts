import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";
import {SweetAlertsService} from "../../database/sweet-alerts.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  productForm!: FormGroup
  public newProduct: Product = {id: 0, name: '', price: '0', description: '', photo: '' }
  public products: Product[] = []
  public image!: File
  public selectedImage!: string
  isLogin: boolean = false
  showInvalidSubmit: boolean = false

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private alerts: SweetAlertsService
  ) {
  }
  ngOnInit() {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getAllProducts();
    this.productForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        description: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        price: ["", [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
        image: ["", [Validators.required]]
      }
    )
  }

  get form() {
    return this.productForm.controls
  }

  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
    }
  }

  public onSubmit(): void {
    if (this.productForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    this.alerts.confirmAlert('¿Seguro que quieres crear un nuevo producto?').subscribe(
      data => {
        if (data) {
          let name = this.productForm.get('name')?.value || ''
          let description = this.productForm.get('description')?.value || ''
          let price = this.productForm.get('price')?.value || ''
          this.newProduct.name = name
          this.newProduct.description = description
          this.newProduct.price =  price

          this.productService.createProduct(this.image, this.newProduct)
            .subscribe(_ => {
              this.alerts.basicAlert('Producto creado correctamente')
              this.getAllProducts()
              this.onReset()
            })
        }
      }
    )
  }

  public onReset() {
    this.productForm.reset()
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

  public deleteProduct(id: number): void {
    this.alerts.confirmAlert('¿Quieres eliminar el producto?', 'No podrás revertirlo',).subscribe(
      data  => {
        if (data) {
          this.productService.deleteProduct(id).subscribe( _ => {
            this.alerts.basicAlert('Borrado', 'El producto ha sido borrado')
            this.products = this.products.filter(product => product.id !== id);
            this.getAllProducts();
          });
        }
      }
    )
  }

}
