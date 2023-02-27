import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthPassportService} from "../database/auth-passport.service";

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.checkDouble().pipe(
      map(
        data => {
          if (data.isLogin && !data.isTrainer) {
            this.auth.sendVariable(data.isLogin, data.isTrainer);
            this.router.navigate(['/customer/account'])
            return false
          } else if (data.isLogin && data.isTrainer) {
            this.auth.sendVariable(data.isLogin, data.isTrainer);
            this.router.navigate(['/admin/account'])
            return false
          } else {
            return true
          }
        }
      )
    )
  }
}
