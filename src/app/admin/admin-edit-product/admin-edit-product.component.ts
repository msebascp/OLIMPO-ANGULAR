import {Component} from '@angular/core';
import {Blog} from "../../interfaces/blog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../../database/database.service";
import {Location} from "@angular/common";
import {AuthPassportService} from "../../database/auth-passport.service";
import Swal from "sweetalert2";
import {Product} from "../../interfaces/product";
import {ProductService} from "../../database/product.service";

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditProductComponent {
  isLogin: boolean = false;
  public selectedProduct!: Product;
  public image!: File;
  public updatedProduct: Product = {id: 0, name: '', description: '', photo: ''};

  productForm!: FormGroup
  showInvalidSubmit: boolean = false
  public selectedImage: string = ''

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
      }
    )
  }


  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin: any) => {
      if (isLogin) {
        this.isLogin = true;
        this.getProductById();
      }
    });
  }

  public getProductById(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      let id: number = +idString;

      this.productService.getProductById(id).subscribe(product => {
        this.selectedProduct = product;
        console.log(product)
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public onFileChange(event: any): void {
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
      title: "<h5 style='color:white'>" + '¿Seguro que quieres modificar el producto?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Modificar',
      background: '#1F2937'
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.productForm.get('name')?.value === '' || this.productForm.get('description')?.value === '') {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Debes ingresar un título y una descripción' + "</h5>",
            icon: 'warning',
            background: '#1F2937'
          })
        } else {

          let name = this.productForm.get('name')?.value || '';
          let description = this.productForm.get('description')?.value || '';

          this.updatedProduct.name = name;
          this.updatedProduct.description = description;
          this.updatedProduct.photo = this.selectedProduct.photo

          this.productService.updatePost(this.selectedProduct.id, this.updatedProduct, this.image).subscribe(_ => {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Modificado' + "</h5>",
              text: 'El post ha sido modificado',
              icon: 'success',
              background: '#1F2937'
            })
            this.location.back();
          })
        }
      }
    })
  }

  get form() {
    return this.productForm.controls
  }

  public goBack(): void {
    this.location.back();
  }
}
