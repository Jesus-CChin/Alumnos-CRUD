import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alumnos } from 'src/app/models/alumnos.models';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  form: any;
  alumnos : Alumnos[] = [];
  optionModal = 0;
  titleDescription = 'Agregar Alumno';
  alumno !: Alumnos;

  constructor(private alumnosService: AlumnosService, private fb: FormBuilder) { 
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        app1 : ['', Validators.required],
        app2 : ['', Validators.required],
        grado : [1, Validators.required],
        grupo : ['A', Validators.required],
        imagen: ['', Validators.required],
        estatus: ['A']
      }
    )
    this.alumnosService.getAlumnos().subscribe(
      resp => this.alumnos = resp,
      err => console.log('err', err)
    )
  }

  ngOnInit(): void {
  }

  showModal(opt: number , titleDescription: string, alumno ?: Alumnos){
    this.clearData();
    if(alumno) {
      this.form.controls['imagen'].setValue(alumno.imagen);
      this.form.controls['estatus'].setValue(alumno.estatus);
      this.alumno = alumno;
    }
    this.optionModal = opt;
    this.titleDescription = titleDescription;
  }

  deleteStudent(id: number){
    Swal.fire({
      title: '¿De verdad desea eliminar el alumno?',
      text: "Se borrará permanentemente de la base de datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.deleteAlumno(id).subscribe(
          resp => this.alumnos = resp,
          err => console.log(err)
        )
        Swal.fire(
          'Eliminado!',
          'El alumno fue eliminado con exito.',
          'success'
        )
      }
    })
   
  }

  postAlumno(){
    let Alumno : Alumnos;
    Alumno = {
      id: 0,
      nombre: this.form.value['nombre'],
      app1: this.form.value['app1'],
      app2: this.form.value['app2'],
      grado: this.form.value['grado'].toString(),
      grupo: this.form.value['grupo'],
      imagen: this.form.value['imagen'],
      estatus: 'A'
    }
    this.alumnosService.postAlumno(Alumno).subscribe(
      resp => {
        this.alumnos = resp
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alumno Agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => console.log(err)
    )
    this.clearData();
  }

  updateAlumno(){
    // console.log(this.alumno)
    this.alumno.imagen = this.form.value['imagen'];
    this.alumno.estatus = this.form.value['estatus'];
    this.alumnosService.updateAlumno(this.alumno, this.alumno.id).subscribe(
      resp => this.alumnos = resp,
      err => console.log(err)
    );
    this.clearData();
  }

  clearData(){
    this.form.reset();
    this.form.controls['estatus'].setValue("A");
    this.form.controls['grado'].setValue("1");
    this.form.controls['grupo'].setValue("A");
    ($('#addModal') as any).modal('hide');
  }
}
