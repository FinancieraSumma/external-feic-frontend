
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cfg } from '../../config/gral.config';

@Injectable({
  providedIn: 'root'
})
export class FeicIndService {
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
  
  
    pIndividual_list(data): Observable<any> {

        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);


        let mkparams = new HttpParams();
        mkparams = mkparams.append('empresa',  data.empresa);
        mkparams = mkparams.append('sucursal', data.sucursal);       
        mkparams = mkparams.append('idioma',   data.idioma);
        mkparams = mkparams.append('usuario',  data.usuario);
        mkparams = mkparams.append('ejercicio',data.ejercicio);
        mkparams = mkparams.append('periodo',  data.periodo);
        mkparams = mkparams.append('suscripcion',  data.suscripcion);

        return this.http.get(this.url + '/pindividual', {headers:mkheaders,params: mkparams} )
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual1_list(mkclave): Observable<any> {

        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);


        let mkparams = new HttpParams();
        mkparams = mkparams.append('usuario',  'HROSALES');
        mkparams = mkparams.append('empresa',  'SUMMA');
        mkparams = mkparams.append('sucursal', '0');
        mkparams = mkparams.append('clave',  mkclave);
        return this.http.get(this.url + '/pindividual1', {headers:mkheaders,params: mkparams} )
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual2_list(mkclave): Observable<any> {

        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);


        let mkparams = new HttpParams();
        mkparams = mkparams.append('usuario',  'HROSALES');
        mkparams = mkparams.append('empresa',  'SUMMA');
        mkparams = mkparams.append('sucursal', '0');
        mkparams = mkparams.append('clave',  mkclave);
        return this.http.get(this.url + '/pindividual2', {headers:mkheaders,params: mkparams} )
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual_uno(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividual/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  
    pIndividual1_uno(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividual1/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    } 
    pIndividual2_uno(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividual2/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    } 

    pIndividual_unoclave(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividualclave/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    } 

    pIndividual2_unoclave(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividual2clave/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    } 
    pIndividual3_unoclave(id): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.get(this.url + '/pindividual3clave/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    } 

    pIndividual_nuevo(data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.post(this.url + '/pindividual', mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  

    pIndividual1_nuevo(data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.post(this.url + '/pindividual1', mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  

    pIndividual2_nuevo(data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.post(this.url + '/pindividual2', mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }  

    pIndividual_actualizar(id, data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.put(this.url +  '/pindividual/' + id, mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    pIndividual1_actualizar(id, data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.put(this.url +  '/pindividual1/' + id, mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual2_actualizar(id, data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.put(this.url +  '/pindividual2/' + id, mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual3_actualizar(id, data): Observable<any> {
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        let mkdata=JSON.stringify(data)
        return this.http.put(this.url +  '/pindividual3/' + id, mkdata, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    pIndividual_borrar(id){
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.delete<any>(this.url + '/pindividual/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    pIndividual_borrarTitular(id){
        let mkheaders = new HttpHeaders();
        mkheaders = mkheaders.set('Content-Type','application/json');
        mkheaders = mkheaders.set('authorization',this.token);
        return this.http.delete<any>(this.url + '/pindividualtitular/' + id, {headers:mkheaders})
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

///////////////////  MASTER individual
pimaster_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = data;

    return this.http.get(this.url + '/pimaster', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
pimaster_nuevo(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/pimaster', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
pimaster_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/pimaster/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
pimaster_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/pimaster/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
pimaster_pdf(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/pimasterpdf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
pimaster_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/pimaster/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

///////////////////  MASTER JURIDICA
pjmaster_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    
    let mkparams = data;


    return this.http.get(this.url + '/pjmaster', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
pjmaster_nuevo(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/pjmaster', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
pjmaster_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/pjmaster/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
pjmaster_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/pjmaster/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
pjmaster_pdf(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/pjmasterpdf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
pjmaster_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/pjmaster/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
///////////////////  TITULAR

pititular_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);

    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/titular', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

pititular_nuevo(data): Observable<any> {

    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/titular', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
pititular_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/titular/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
pititular_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/titular/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
pititular_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/titular/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
////// ASOCIADOS PEP
asociadoPep_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/apep', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
asociadoPep_nuevo(data): Observable<any> {    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/apep', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
asociadoPep_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/apep/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
asociadoPep_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/apep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
asociadoPep_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/apep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// INFORMACION ECONOMICA EMPRESA
infoEcoEmpresa_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/infoecoemp', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEcoEmpresa_nuevo(data): Observable<any> {    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/infoecoemp', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
infoEcoEmpresa_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/infoecoemp/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEcoEmpresa_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/infoecoemp/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
infoEcoEmpresa_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/infoecoemp/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// DATOS PEP
Pep_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);

    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/dpep', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
Pep_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/dpep', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
Pep_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/dpep/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
Pep_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/dpep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
Pep_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/dpep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
////// PARIENTE PEP
parientePep_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/ppep', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
parientePep_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/ppep', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
parientePep_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/ppep/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
parientePep_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/ppep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
parientePep_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/ppep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// PERSONAS JURIDICAS PROVEEDORAS DE FONDOS
perJurProvFon_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/perjpf', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
perJurProvFon_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/perjpf', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
perJurProvFon_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/perjpf/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
perJurProvFon_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/perjpf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
perJurProvFon_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/perjpf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// PERSONAS INDIVIDUALES PROVEEDORAS DE FONDOS
perIndProvFon_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/peripf', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
perIndProvFon_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/peripf', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
perIndProvFon_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/peripf/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
perIndProvFon_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/peripf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
perIndProvFon_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/peripf/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// OTROS FIRMANTES
otrosFirmantes_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/ofir', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
otrosFirmantes_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/ofir', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
otrosFirmantes_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/ofir/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
otrosFirmantes_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/ofir/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
otrosFirmantes_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/ofir/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// FIRMANTES
firmantes_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/fir', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
firmantes_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/fir', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
firmantes_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/fir/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
firmantes_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/fir/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
firmantes_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/fir/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// PROD Y SERV
prodServ_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/pserv', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
prodServ_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/pserv', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
prodServ_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/pserv/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
prodServ_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/pserv/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
prodServ_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/pserv/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// INFO ECO CLIENTE
infoEcoCte_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/iecocte', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEcoCte_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/iecocte', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
infoEcoCte_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/iecocte/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEcoCte_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/iecocte/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
infoEcoCte_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/iecocte/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// INFO ECO
infoEco_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/ieco', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEco_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/ieco', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
infoEco_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/ieco/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoEco_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/ieco/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
infoEco_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/ieco/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

////// INFO REP
infoRep_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/irep', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoRep_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/irep', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
infoRep_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/irep/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
infoRep_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/irep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
infoRep_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/irep/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// Organo Admon
organoAdmon_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/oadmon', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
organoAdmon_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/oadmon', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
organoAdmon_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/oadmon/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
organoAdmon_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/oadmon/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
organoAdmon_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/oadmon/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// Datos Identificacion
datosIdentificacion_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/dide', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
datosIdentificacion_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/dide', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
datosIdentificacion_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/dide/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
datosIdentificacion_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/dide/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
datosIdentificacion_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/dide/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// Sociedad Mercantil
sociedadMercantil_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/socm', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
sociedadMercantil_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/socm', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
sociedadMercantil_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/socm/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
sociedadMercantil_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/socm/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
sociedadMercantil_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/socm/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}



////// Otro Tipo de Entidad
otroTipoEntidad_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/otipe', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
otroTipoEntidad_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/otipe', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
otroTipoEntidad_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/otipe/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
otroTipoEntidad_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/otipe/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
otroTipoEntidad_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/otipe/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}


////// Estructura Accionaria
estructuraAccionaria_list(data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkparams = new HttpParams();
    mkparams = mkparams.append('idpadre',  data.idpadre);
    mkparams = mkparams.append('clave',  data.clave);

    return this.http.get(this.url + '/esacc', {headers:mkheaders,params: mkparams} )
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
estructuraAccionaria_nuevo(data): Observable<any> {
    
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.post(this.url + '/esacc', mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}  
estructuraAccionaria_actualizar(id, data): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    let mkdata=JSON.stringify(data)
    return this.http.put(this.url +  '/esacc/' + id, mkdata, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}
estructuraAccionaria_uno(id): Observable<any> {
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.get(this.url + '/esacc/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
} 
estructuraAccionaria_borrar(id){
    let mkheaders = new HttpHeaders();
    mkheaders = mkheaders.set('Content-Type','application/json');
    mkheaders = mkheaders.set('authorization',this.token);
    return this.http.delete<any>(this.url + '/esacc/' + id, {headers:mkheaders})
    .pipe(
        retry(1),
        catchError(this.handleError)
    )
}

/////////////////////////////////////


/////////////////////////////////////



  
  // Error handling 
  handleError(error) {
    return throwError(error);
  }
  
}


