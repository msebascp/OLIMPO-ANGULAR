import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {finalize, map, Observable} from 'rxjs';
import {AuthPassportService} from "../database/auth-passport.service";
import {LoadingService} from "../database/loading.service";

@Injectable({
  providedIn: 'root'
})
export class CheckTrainerGuard implements CanActivate {
  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private loading: LoadingService,
  ) {
  }
  canActivate(): Observable<boolean> {
    this.loading.show();
    return this.auth.checkDouble().pipe(
      finalize(() => {
        setTimeout(() => {
          this.loading.hide()
        }, 200)
      }),
      map(
        data => {
          if (data.isLogin && data.isTrainer) {
            this.auth.sendVariable(data.isLogin, data.isTrainer);
            return true
          } else if (data.isLogin && !data.isTrainer) {
            this.auth.sendVariable(data.isLogin, data.isTrainer);
            this.router.navigate(['/customer/account'])
            return false
          } else {
            this.auth.sendVariable(false, false);
            this.router.navigate(['/admin/login'])
            return false
          }
        }
      )
    )
  }
}
