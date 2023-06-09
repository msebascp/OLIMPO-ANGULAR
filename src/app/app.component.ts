import {Component} from '@angular/core';
import {LoadingService} from "./database/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OLIMPO_ANGULAR';
  isLoading: boolean = false

  constructor(
    private isLoadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.isLoadingService.getVariable().subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }
}
