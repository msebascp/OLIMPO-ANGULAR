import { Component } from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-general',
  templateUrl: './register-general.component.html',
  styleUrls: ['./register-general.component.scss']
})


export class RegisterGeneralComponent {
  constructor (
    private route: ActivatedRoute,
    private location: Location,
  ) { }
  
  public goBack(): void {
    this.location.back();
  }
}
