
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cfg } from '../../config/gral.config';

@Injectable({
  providedIn: 'root'
})

export class ConsecutivoService {
    public url: string;
    public token: string;
    public identity: any;
    
    //public params: any;
  constructor(private http: HttpClient) { 
    this.url = Cfg.BackendUrl;
    this.token= null;

  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  // authorization: 'my-auth-token'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

 

  consecutivo_actualizar(id): Observable<any> {
    return this.http.put(this.url +  '/consecutivo/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     return throwError(error);
  }
  
}

