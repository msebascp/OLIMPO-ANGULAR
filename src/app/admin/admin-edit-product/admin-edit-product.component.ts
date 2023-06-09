import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthPassportService} from "../../database/auth-passport.service";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";
import {SweetAlertsService} from "../../database/sweet-alerts.service";

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditProductComponent {
  selectedProduct: Product = {id: 0, name: '', price: '0', description: '', photo: ''}
  updatedProduct: Product = {id: 0, name: '', price: '0', description: '', photo: ''}
  showInvalidSubmit: boolean = false
  newImage!: File
  newImageString: string = ''
  productForm!: FormGroup
  isLogin: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alerts: SweetAlertsService
  ) {
  }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.productForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        price: ["", [Validators.required]],
        image: ["",],
      }
    )
    this.getProductById();
  }

  //Gets the product data to edit and adds it to the form
  public getProductById(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      let id: number = +idString
      this.productService.getProductById(id).subscribe(product => {
        this.selectedProduct = product
        this.productForm.patchValue({
          name: this.selectedProduct.name,
          description: this.selectedProduct.description,
          price: this.selectedProduct.price
        })
      })
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  //Save the image when the input file changes
  public onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.newImage = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.newImage)
      reader.onload = () => {
        this.newImageString = reader.result as string
      }
    }
  }

  //Edit the data of the selected product
  public onSubmit(): void {
    if (this.productForm.invalid) {
      this.showInvalidSubmit = true
      return
    }
    this.alerts.confirmAlert('¿Seguro que quieres modificar el producto?').subscribe(
      data => {
        if (data) {
          let name = this.productForm.get('name')?.value || ''
          let description = this.productForm.get('description')?.value || ''
          let price = this.productForm.get('price')?.value || ''

          this.updatedProduct.name = name
          this.updatedProduct.description = description
          this.updatedProduct.price = price
          this.updatedProduct.photo = this.selectedProduct.photo

          this.productService.updateProduct(this.selectedProduct.id, this.updatedProduct, this.newImage).subscribe(_ => {
            this.alerts.basicAlert('Modificado', 'El producto ha sido modificado')
            this.location.back()
          })
        }
      }
    )
  }

  get form() {
    return this.productForm.controls
  }

  public goBack(): void {
    this.location.back();
  }
}
