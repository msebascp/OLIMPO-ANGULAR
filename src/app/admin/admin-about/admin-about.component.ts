import { Component, Input } from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import { MediaService } from '../../database/media.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss']
})
export class AdminAboutComponent {
  isLogin: boolean = false;
  @Input() instagram: string = '';
  @Input() facebook: string = '';

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private mediaService: MediaService) {
    }

  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.instagram = this.mediaService.mostrarValorInsta();
        this.facebook = this.mediaService.mostrarValorFacebook();
      }
    });
  }
}