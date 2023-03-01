import { Component, Input } from '@angular/core';
import { AuthPassportService } from "../../database/auth-passport.service";
import { Router } from "@angular/router";
import { MediaService } from '../../database/media.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Information } from 'src/app/interfaces/information';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss']
})
export class AdminAboutComponent {
  isLogin: boolean = false;
  aboutForm!: FormGroup
  showInvalidSubmit: boolean = false;
  media: Information = { id: 0, instagram: '', facebook: '', horario1: '', horario2: '' };
  updatedMedia: Information = { id: 0, instagram: '', facebook: '', horario1: '', horario2: '' }

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private mediaService: MediaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getAllAboutUs();
    this.aboutForm = this.formBuilder.group(
      {
        instagram: ["", [Validators.required]],
        facebook: ["", [Validators.required]],
        horario1: ["", [Validators.required]],
        horario2: ["", [Validators.required]]
      }
    )
  }

  getAllAboutUs() {
    this.mediaService.getMedia().subscribe(information => {
      information.forEach(media => {
        this.media.id = media.id;
        this.media.instagram = media.instagram;
        this.media.facebook = media.facebook;
        this.media.horario1 = media.horario1;
        this.media.horario2 = media.horario2;
      })
    });
  }

  onSubmit() {
    if (this.aboutForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    const instagram = this.aboutForm.get('instagram')?.value || '';
    const facebook = this.aboutForm.get('facebook')?.value || '';
    const horario1 = this.aboutForm.get('horario1')?.value || '';
    const horario2 = this.aboutForm.get('horario2')?.value || '';

    this.updatedMedia.id = this.media.id;
    this.updatedMedia.instagram = instagram;
    this.updatedMedia.facebook = facebook;
    this.updatedMedia.horario1 = horario1;
    this.updatedMedia.horario2 = horario2;


    this.mediaService.editMedia(this.media.id, this.updatedMedia).subscribe(_ => {
      Swal.fire({
        title: "<h5 style='color:white'>" + 'Información modificada' + "</h5>",
        icon: 'success',
        background: '#1F2937'
      })
    })
  }

  get form() {
    return this.aboutForm.controls;
  }

}
