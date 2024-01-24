
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Formulario } from '../models/formulario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  url = 'http://localhost:3000/formulario'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os cadastros
  getFormulario(): Observable<Formulario[]> {
    return this.httpClient.get<Formulario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um cadastro pelo id
  getFormularioById(id: number): Observable<Formulario> {
    return this.httpClient.get<Formulario>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um cadastro
  saveFormulario(formulario: Formulario): Observable<Formulario> {
    return this.httpClient.post<Formulario>(this.url, JSON.stringify(formulario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um cadastro
  updateFormulario(formulario: Formulario): Observable<Formulario> {
    return this.httpClient.put<Formulario>(this.url + '/' + formulario.id, JSON.stringify(formulario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um cadastro
  deleteFormulario(formulario: Formulario) {
    return this.httpClient.delete<Formulario>(this.url + '/' + formulario.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }};
