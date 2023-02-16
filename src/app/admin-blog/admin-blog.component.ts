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
  public newPost: Blog = {id: 0, title: '', description: '', photo: '' };
  public posts: Blog[] = []
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
        this.getAllPosts();
      }
    });
  }

  public onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  public onSubmit(): void {
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
          .subscribe(_ => {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Post Creado' + "</h5>",
              text: 'El Post ha sido creado',
              icon: 'success',
              background: '#1F2937'
            })
            this.getAllPosts();
          })

      }
    });
  }

  public getAllPosts(): void {
    this.databaseService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  public deletePost(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres eliminar el post?' + "</h5>",
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
        this.databaseService.deletePost(id).subscribe( _ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Borrado' + "</h5>",
            text: 'El Post ha sido borrado',
            icon: 'success',
            background: '#1F2937'
          })
          this.posts = this.posts.filter(post => post.id !== id);
          this.getAllPosts();
        });
      }
    })
  }

}
