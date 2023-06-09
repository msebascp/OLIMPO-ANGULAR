import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {finalize, map, Observable} from 'rxjs';
import {AuthPassportService} from "../database/auth-passport.service";
import {LoadingService} from "../database/loading.service";

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
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
