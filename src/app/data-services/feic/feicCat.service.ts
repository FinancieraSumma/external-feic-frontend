
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cfg } from '../../config/gral.config';

@Injectable({
  providedIn: 'root'
})
export class FeicCatService {
    public url: string;
    public token: string;
    public headers: any;
    public identity: any;
    public paramsList: any;

    //public params: any;
    constructor(private http: HttpClient) { 
        this.url = Cfg.BackendUrl;
        this.token=localStorage.getItem('token');
    }
  
  
    list(data): Observable<any> {

        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);


        let mkparams = new HttpParams();
        mkparams = mkparams.append('usuario',  data.usuario);
        mkparams = mkparams.append('catalogo',data.catalogo);

        return this.http.get(this.url + '/feiccat', {headers:mkheaders,params: mkparams} )
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    uno(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/feiccat/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  

    nuevo(data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.post(this.url + '/feiccat', mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  

    actualizar(id, data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.put(this.url +  '/feiccat/' + id, mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    borrar(id){
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.delete<any>(this.url + '/feiccat/' + id, {headers:mkheaders})
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


