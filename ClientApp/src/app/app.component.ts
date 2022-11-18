import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnosService } from './services/alumnos.service';
import { Alumnos } from './models/alumnos.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  Alumnos: Alumnos[] = [];
  title = 'ClientApp';
  constructor(private alumnoService: AlumnosService) {
    this.alumnoService.getAlumnos().subscribe(
      resp => { this.Alumnos = resp },
      err => console.log(err)
    )
  }
}
