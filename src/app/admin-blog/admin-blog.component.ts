import { Component } from '@angular/core';
import { AuthPassportService } from "../database/auth-passport.service";
import { Router } from "@angular/router";
import { DatabaseService } from '../database/database.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Blog } from '../interfaces/blog';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent {
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })
  public newPost: Blog = {title: '', description: '', photo: ''};
  public image!: File;

  isLogin: boolean = false;
  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private databaseService: DatabaseService,
  ) {
  }
  ngOnInit() {
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
  }

  public onFileChange(event: any) {
    this.image = event.target.files[0];
    console.log(this.image)
  }

  public onSubmit() {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres subir el Post?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Crear',
      background: '#1F2937'
    }).then((result: any) => {
      if (result.isConfirmed) {
        const title = this.postForm.get('title')?.value || '';
        const description = this.postForm.get('description')?.value || '';

        this.newPost.title = title;
        this.newPost.description = description;

        this.databaseService.createPost(this.image, this.newPost)
          .subscribe( _ => {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Modificado' + "</h5>",
              text: 'El cliente ha sido modificado',
              icon: 'success',
              background: '#1F2937'
            })
          })
      }
    });
  }

}
