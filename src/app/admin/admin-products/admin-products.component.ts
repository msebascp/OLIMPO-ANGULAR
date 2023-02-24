import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  productForm!: FormGroup
  showInvalidSubmit: boolean = false
  public newProduct: Product = {id: 0, name: '', description: '', price: '0', photo: '' };
  public products: Product[] = []
  public image!: File;
  public selectedImage: string = ''
  isLogin: boolean = false;

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
  }
  ngOnInit() {
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.getAllProducts();
      }
    });
    this.productForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        price: ["", [Validators.required]],
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
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres crear un nuevo producto?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Crear',
      background: '#1F2937'
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.image === undefined) {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Se debe subir una foto' + "</h5>",
            icon: 'warning',
            background: '#1F2937'
          })
        }
        let name = this.productForm.get('name')?.value || '';
        let description = this.productForm.get('description')?.value || '';
        let price = this.productForm.get('price')?.value || '';

        this.newProduct.name = name;
        this.newProduct.description = description;
        this.newProduct.price = price

        this.productService.createProduct(this.image, this.newProduct)
          .subscribe(_ => {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Producto creado' + "</h5>",
              text: 'El producto ha sido creado',
              icon: 'success',
              background: '#1F2937'
            })
            this.getAllProducts();
            this.onReset();
          })

      }
    });
  }

  public onReset() {
    this.productForm.get('name')?.reset()
    this.productForm.get('description')?.reset()
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  public deleteProduct(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres eliminar el producto?' + "</h5>",
      text: 'No podrás revertirlo',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        // Recogemos el id que tiene el boton
        this.productService.deleteProduct(id).subscribe( _ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Borrado' + "</h5>",
            text: 'El producto ha sido borrado',
            icon: 'success',
            background: '#1F2937'
          })
          this.products = this.products.filter(product => product.id !== id);
          this.getAllProducts();
        });
      }
    })
  }

}
