import { Component } from '@angular/core';
import { MediaService } from 'src/app/database/media.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  instagram: string = '';
  facebook: string = '';
  horario1: string = '';
  horario2: string = '';
  constructor(
    private mediaService: MediaService,
    ) { }

    ngOnInit(){
      this.getAllAboutUs();
    }

    getAllAboutUs() {
      this.mediaService.getMedia().subscribe(information => {
        information.forEach(media => {
          this.instagram = media.instagram;
          this.facebook = media.facebook;
          this.horario1 = media.horario1;
          this.horario2 = media.horario2;
        })
      });
    }
}
