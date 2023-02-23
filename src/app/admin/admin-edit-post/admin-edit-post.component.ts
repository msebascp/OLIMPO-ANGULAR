import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthPassportService } from '../../database/auth-passport.service';
import { DatabaseService } from '../../database/database.service';
import { Blog } from '../../interfaces/blog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-post',
  templateUrl: './admin-edit-post.component.html',
  styleUrls: ['./admin-edit-post.component.scss']
})
export class AdminEditPostComponent {
  isLogin: boolean = false;
  public selectedPost!: Blog;
  public image!: File;
  public updatedPost: Blog = {id: 0, title: '', description: '', photo: '' };

  postForm!: FormGroup
  showInvalidSubmit: boolean = false

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private location: Location,
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin: any) => {
      if (isLogin) {
        this.isLogin = true;
        this.getPostById();
      }
    });
    this.postForm = this.formBuilder.group(
      {
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
      }
    )
  }

  public getPostById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;

      this.databaseService.getPostById(id).subscribe(post => {
        this.selectedPost = post;
        console.log(post)
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public onFileChange(event: any): void {
    this.image = event.target.files[0];
  }


  public onSubmit(): void {
    if (this.postForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres modificar el post?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Modificar',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        if (this.postForm.get('title')?.value === '' ||this.postForm.get('description')?.value === '') {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Debes ingresar un título y una descripción' + "</h5>",
            icon: 'warning',
            background: '#1F2937'
          })
        } else {

        const title = this.postForm.get('title')?.value || '';
        const description = this.postForm.get('description')?.value || '';


          this.updatedPost.title = title;

          this.updatedPost.description = description;
          this.updatedPost.photo = this.selectedPost.photo

        this.databaseService.updatePost(this.selectedPost.id, this.updatedPost, this.image).subscribe( _ => {
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
    return this.postForm.controls
  }

  public goBack(): void {
    this.location.back();
  }
}
