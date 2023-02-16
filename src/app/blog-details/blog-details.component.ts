import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database/database.service';
import { Location } from "@angular/common";
import { Blog } from '../interfaces/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {

  public selectedPost!: Blog;

  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getPostById()
  }

  public getPostById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;

      this.databaseService.getPostById(id).subscribe(post => {
        this.selectedPost = post;
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
