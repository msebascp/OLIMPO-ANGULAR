import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AuthPassportService} from "./database/auth-passport.service";
import {info} from "autoprefixer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OLIMPO_ANGULAR';
}
