import { Component } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Blog } from '../interfaces/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public posts: Blog[] = []
  
  constructor (
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getAllPosts()
  }


  public getAllPosts(): void {
    this.databaseService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    })
  }
}
