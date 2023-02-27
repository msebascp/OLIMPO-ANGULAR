import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthPassportService} from "../database/auth-passport.service";

@Injectable({
  providedIn: 'root'
})
export class CheckCustomerGuard implements CanActivate {
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
            return true
          } else {
            this.router.navigate(['/login'])
            return false
          }
        }
      )
    )
  }
}
