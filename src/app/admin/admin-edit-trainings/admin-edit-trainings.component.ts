import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPassportService } from '../../database/auth-passport.service';
import { DatabaseService } from '../../database/database.service';
import { Trainings } from '../../interfaces/trainings';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-edit-trainings',
  templateUrl: './admin-edit-trainings.component.html',
  styleUrls: ['./admin-edit-trainings.component.scss']
})
export class AdminEditTrainingsComponent {
  isLogin: boolean = false;
  public trainings: Trainings[] = [];

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getAllTrainingsByCustomer()
  }

  public getAllTrainingsByCustomer() {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getAllTrainingsByCustomer(id).subscribe(trainings => {
        this.trainings = trainings;
      });
    }
  }

  public deleteTraining(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres eliminar el entrenamiento?' + "</h5>",
      text: 'No podrás revertirlo',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        // Recogemos el 'id' que tiene el boton
        this.databaseService.deleteTraining(id).subscribe( _ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Borrado' + "</h5>",
            text: 'El entrenamiento ha sido borrado',
            icon: 'success',
            background: '#1F2937'
          })
          this.trainings = this.trainings.filter(training => training.id !== id);
          this.getAllTrainingsByCustomer();
        });
      }
    })
  }
  public goBack(): void {
    this.location.back();
  }
}
