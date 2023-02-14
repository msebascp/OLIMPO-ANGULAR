import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthPassportService} from "../database/auth-passport.service";

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  constructor(
    public router: Router,
    public auth: AuthPassportService
  ) { }

  ngOnInit() {
  }
}
