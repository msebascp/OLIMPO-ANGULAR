import { Component, Input } from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
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


}
