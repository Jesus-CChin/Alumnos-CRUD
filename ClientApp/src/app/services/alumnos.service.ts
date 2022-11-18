import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Alumnos } from '../models/alumnos.models';
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  readonly _baseUrl = environment.apiUrl+'/api/alumnos';

  getAlumnos(): Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(`${this._baseUrl}`)
  }

  deleteAlumno( id :number ) : Observable<Alumnos[]>{
    return this.http.delete<Alumnos[]>(`${this._baseUrl}/${id}`)
  }

  postAlumno(alumno : Alumnos): Observable<Alumnos[]>{
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Alumnos[]>(`${this._baseUrl}`, alumno, )
  }

  updateAlumno(alumno: Alumnos, id: number): Observable<Alumnos[]>{
    return this.http.put<Alumnos[]>(`${this._baseUrl}/${id}`,alumno)
  }

}
