'use strict'

// declare var toastr: any;
// declare var jQuery:any;
// declare var $:any;
// declare var Clipboard:any;

interface MensajeOut{
    numero: number;
    idioma: string;
    descripcion: string;
    mensaje: string;
    titulo: string;
    tipo: string;
    ref: string;

}

// Importo el archivo JSON 
import  mensajejson from '../messages/mensaje.json';

export class Valfuctions {        
    static mkValEspecifico(mknumber: number, mkidioma: string, mkreferencia: string  ){   
        let resultado : MensajeOut ;  
        resultado = mensajejson.find( error => error.numero == mknumber && error.idioma == mkidioma);  
        console.log(resultado,mknumber,mkidioma,mkreferencia);   
        console.log(resultado);
        // resultado.ref = mkreferencia;        
        return resultado;
    }
    static mkValLogin(mkparams: any){
        let resultado : MensajeOut ; 
        if (mkparams.usuario == '' || !mkparams.usuario  ){
            resultado = mensajejson.find( mensaje => mensaje.numero == 4001 &&  mensaje.idioma == mkparams.idioma );
            resultado.ref = 'Usuario';
            return resultado;
        }  else if  (mkparams.password == '' || !mkparams.password  ){
            resultado = mensajejson.find( mensaje => mensaje.numero == 4001 &&  mensaje.idioma == mkparams.idioma);
            resultado.ref = 'Password';
            return resultado;
        } else  {
            resultado = mensajejson.find( mensaje => mensaje.numero == 0 &&  mensaje.idioma == mkparams.idioma );
            resultado.ref = '';
            return resultado;
        }
    } 
    static mkValRegistrar(mkparams: any){
        let resultado : MensajeOut ; 
        if (mkparams.modulo == 'REG' ) {
            if (mkparams.proceso == 'NEW') {
                var str1 = new String( mkparams.email ); 
                var index = 1; //str1.indexOf( "@total-solutionscorp.com" );
                //console.log('solutionscorp',index);
                if (mkparams.email == '' || !mkparams.email  ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4001 &&  mensaje.idioma == mkparams.idioma );
                    resultado.ref = 'Email';
                    return resultado;
                } else if  (index == -1 ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4024 &&  mensaje.idioma == mkparams.idioma);
                    resultado.ref = mkparams.email;
                    return resultado;
                } else if  (mkparams.password == '' || !mkparams.password  ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4001 &&  mensaje.idioma == mkparams.idioma);
                    resultado.ref = 'Password';
                    return resultado;
                } else if  (mkparams.confirmPassword == '' || !mkparams.confirmPassword  ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4001 &&  mensaje.idioma == mkparams.idioma );
                    resultado.ref = 'Confirm Password';
                    return resultado;
                } else if  (mkparams.password != mkparams.confirmPassword  ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 2005 &&  mensaje.idioma == mkparams.idioma );
                    resultado.ref = 'Password';
                    return resultado;
                } else  {
                    resultado = mensajejson.find( mensaje => mensaje.numero == 0 &&  mensaje.idioma == mkparams.idioma );
                    resultado.ref = '';
                    return resultado;
                }
            }
        } else {
            resultado = mensajejson.find(mensaje => mensaje.numero == 0 && mensaje.idioma == mkparams.idioma);
            resultado.ref = '';
            return resultado;
        } // Fin Modulo INV
        return resultado;
    } // Fin mkValCamposDetalle
    static mkValCampos(mkmov: any, mkmovDet: any ){
        let resultado : MensajeOut ;
        // Modulo de Inventario
        if (mkmov.modulo == 'INV' ) {
            if (mkmov.email == '' || !mkmov.email  ){
                resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                resultado.ref = 'email';
                return resultado;
            } else {

                if (mkmov.Mov == 'Entrada') {
                    if (mkmov.Estatus != 'SINAPLICAR' ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4003 );
                        resultado.ref = mkmov.Estatus;
                        return resultado;
/*                     } else if (mkmov.Proyecto == '' || !mkmov.Proyecto  ){
                        const resultado = errorjson.find( error => error.numero == 4001 );
                        resultado.ref = 'Proyecto';
                        return resultado; */
                    } else if (mkmov.Moneda == '' || !mkmov.Moneda  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Moneda';
                        return resultado;
                    } else if (mkmov.FechaEmision == '' || !mkmov.FechaEmision  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Fecha Emision';
                        return resultado;
/*                     } else if (mkmov.Concepto == '' || !mkmov.Concepto  ){
                        const resultado = errorjson.find( error => error.numero == 4001 );
                        resultado.ref = 'Concepto';
                        return resultado; */
                    } else if (mkmov.Almacen == '' || !mkmov.Almacen  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Almacen';
                        return resultado;
                    } else if (mkmovDet.length == 0){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4002 );
                        resultado.ref = 'detalle';
                        return resultado;
                    } else {
                        resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                        return resultado;
                    }
                } // FIN Mov Entrada



            } // FIN Validacion campo Modulo

        } // Fin Modulo INV

        if (mkmov.modulo == 'REST' ) {
            if (mkmov.email == '' || !mkmov.email  ){
                resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                resultado.ref = 'email';
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        }

        if (mkmov.modulo == 'USUARIO' ) {
            if ( ( mkmov.suscripcion == 'BASICA' ) && ( mkmov.accion == "delete" )   ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4003 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'BASICA';
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        }
        if (mkmov.modulo == 'VTAS' ) {
            var cel :string=mkmov.numero;
            var num_starter: number; 
            var num_noPlanChange: number;
            var num_extraPerformance: number;
            var num_eliteAgencyPaid: number;
            var num_valueP4gb: number;
            var num_valuePUnlimited: number;


            if ((!mkmov.starter ) || (mkmov.starter == "" ))         { num_starter=0 }          else { num_starter=1 }
            if ((!mkmov.noPlanChange ) || (mkmov.noPlanChange == "" ))         { num_noPlanChange=0 }          else { num_noPlanChange=1 }
            if ((!mkmov.extraPerformance ) || (mkmov.extraPerformance == "" )){ num_extraPerformance=0 } else { num_extraPerformance=1 }
            if ((!mkmov.eliteAgencyPaid ) || (mkmov.eliteAgencyPaid == "" )) { num_eliteAgencyPaid=0 }  else { num_eliteAgencyPaid=1 }
            if ((!mkmov.valueP4gb ) || (mkmov.valueP4gb == "" ))       { num_valueP4gb=0 }        else { num_valueP4gb=1 }
            if ((!mkmov.valuePUnlimited ) || (mkmov.valuePUnlimited == "" )) { num_valuePUnlimited=0 }  else { num_valuePUnlimited=1 }

            var num_camposSuma:number = (num_noPlanChange + num_starter + num_extraPerformance + num_eliteAgencyPaid + num_valueP4gb + num_valuePUnlimited);

            if (( mkmov.producto == "" ) || (!mkmov.producto)){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4001 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'Product';
                return resultado;
            } else if (( mkmov.cru == true ) && ( mkmov.fn == true )){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4020 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'C.R.U. and F.N.';
                return resultado;
            } else if ((( mkmov.producto == "VGA" )  || ( mkmov.producto == "UPG" )) && 
                      ( num_camposSuma==0)
                      ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4001 && mensaje.idioma == mkmov.idioma));
                resultado.ref = ' - at least one of the following: Starter & Extra/Performance & Elite/Agency Paid & Value P. 4Gb & Value P. Unlimited';
                return resultado;
            } else if ((( mkmov.producto == "VGA" )  || ( mkmov.producto == "UPG" )) && 
                      ( num_camposSuma >= 2)
                      ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4020 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'Starter - Extra/Performance - Elite/Agency Paid - Value P. 4Gb - Value P. Unlimited';
                return resultado;
            } else if (( mkmov.protAdv1 == "1" ) && ( mkmov.protAdv4 == "1" )){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4020 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'Prot Adv 1 Prot Adv 4';
                return resultado;
            }else if ((( mkmov.noPlanChange == "1" ) && ( mkmov.extraPerformance == "1" ) && ( mkmov.eliteAgencyPaid == "1" )) ||
                     (( mkmov.noPlanChange == "0" || mkmov.noPlanChange == null ) && ( mkmov.extraPerformance == "1" ) && ( mkmov.eliteAgencyPaid == "1" )) || 
                     (( mkmov.noPlanChange == "1" ) && ( mkmov.extraPerformance == "0" || mkmov.extraPerformance == null ) && ( mkmov.eliteAgencyPaid == "1" )) || 
                     (( mkmov.noPlanChange == "1" ) && ( mkmov.extraPerformance == "1" ) && ( mkmov.eliteAgencyPaid == "0" || mkmov.eliteAgencyPaid == null))) {
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4020 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'No Plan Change - Extra/Performance - Elite/Agency Paid';
                return resultado;
/*             } else if ( ( mkmov.suscripcion == 'BASICA' ) && ( mkmov.accion == "delete" )   ){
                const resultado = mensajejson.find( mensaje => (mensaje.numero == 4005 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'BASICA';
                return resultado; */
            } else if (((mkmov.producto =='BB') || (mkmov.producto =='STAND ALONE PROTECT') || (mkmov.producto =='VGA') || (mkmov.producto =='UPG') || (mkmov.producto =='PREPAID'))  && (( mkmov.numero == "" ) || (!mkmov.numero))   ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4001 && mensaje.idioma == mkmov.idioma)); 
                resultado.ref = 'Number';
                return resultado;
            } else if (mkmov.numero!=null) {            
                    if  ((cel.length < 10) && (mkmov.producto !='BB')) {
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4001 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'Number';
                return resultado;
                } else if  ((cel.length < 9) && (mkmov.producto =='BB')) {
                    resultado = mensajejson.find( mensaje => (mensaje.numero == 4001 && mensaje.idioma == mkmov.idioma));
                    resultado.ref = 'Number';
                    return resultado;
                } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
                }
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        } // Fin Modulo VTAS

        return resultado;

    } // Fin mkValCamposDetalle
    static mkValCamposDetalle(mkmov: any, mkmovDet: any ){
        let resultado : MensajeOut ;
        // Modulo de Inventario
        if (mkmov.Modulo == 'INV' ) {
            if (mkmov.Mov == '' || !mkmov.Mov  ){
                 resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                resultado.ref = 'Movimiento';
                return resultado;
            } else {

                if (mkmov.Mov == 'Entrada') {
                    if (mkmov.Estatus != 'SINAPLICAR' ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4004 );
                        resultado.ref = mkmov.Estatus;
                        return resultado;
                    } else if (mkmovDet.Articulo == '' || !mkmovDet.Articulo  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Articulo';
                        return resultado;
                    } else if (mkmovDet.Cantidad == 0 || !mkmovDet.Cantidad  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Cantidad';
                        return resultado;
                    } else if (mkmovDet.Costo == 0 || !mkmovDet.Costo  ){
                        resultado = mensajejson.find( mensaje => mensaje.numero == 4001 );
                        resultado.ref = 'Costo';
                        return resultado;
                    } else {
                        resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                        return resultado;
                    }
                } // FIN Mov Entrada



            } // FIN Validacion campo Modulo

        } // Fin Modulo INV

        return resultado;
    } // Fin mkValCamposDetalle
    static mkValEliminar(mkmov: any, mkmovDet: any, mkidentity: any ){
        let resultado : MensajeOut ;
        // Modulo de Inventario
        if (mkmov.modulo == 'INV' ) {
            if (mkmov.mov == 'Entrada') {
                if (mkmov.Estatus != 'SINAPLICAR' ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4005 );
                    resultado.ref = mkmov.Estatus;
                    return resultado;
                } else  {
                    resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                    return resultado;
                }
            }
        } else if (mkmov.modulo == 'USUARIO' ) {
            if (mkidentity.suscripcion != 'ADMIN'   ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4026 && mensaje.idioma == mkmov.idioma));
                resultado.ref = mkidentity.suscripcion;
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        } else if (mkmov.Modulo == 'VTAS' ) {
            if (mkmov.suscripcion == 'BASICA'   ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4005 && mensaje.idioma == mkmov.idioma));
                resultado.ref = 'BASICA';
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        } else if (mkmov.modulo == 'SUC' ) {
            if (mkmov.suscripcion == 'BASICA'   ){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4005 && mensaje.idioma == mkmov.idioma));
                resultado.ref='BASICA'
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        } else if (mkmov.modulo == 'BB' || mkmov.modulo == 'VGA' || mkmov.modulo == 'UPG' || mkmov.modulo == 'STAND' || mkmov.modulo == 'PRODUCT' || mkmov.modulo == 'PRECOM') {

            if (mkmov.suscripcion == 'BASICA'){
                resultado = mensajejson.find( mensaje => (mensaje.numero == 4005 && mensaje.idioma == mkmov.idioma));
                resultado.ref='BASICA'
                return resultado;
            } else {
                resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                return resultado;
            }
        } else {
            resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
            return resultado;
        }

        return resultado;


    } // Fin mkValCamposDetalle
    static mkValAfectar(mkmov: any, mkmovDet: any ){
        let resultado : MensajeOut ;
        console.log(mkmov);
        // Modulo de Inventario
        if (mkmov.Modulo == 'INV' ) {
            if (mkmov.Mov == 'Entrada') {
                if (mkmov.Estatus != 'SINAPLICAR' ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4006 );
                    resultado.ref = mkmov.Estatus;
                    return resultado;
                }  else if (mkmov.ID == '0' ) {
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4008 );
                    resultado.ref = mkmov.ID;
                    return resultado;
                }  else  {
                    resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                    return resultado;
                }
            }
        } // Fin Modulo INV
        return resultado;
    } // Fin mkValCamposDetalle
    static mkValCancelar(mkmov: any, mkmovDet: any ){
        let resultado : MensajeOut ;
        // Modulo de Inventario
        if (mkmov.Modulo == 'INV' ) {
            if (mkmov.Mov == 'Entrada') {
                if (mkmov.Estatus != 'CONCLUIDO' ){
                    resultado = mensajejson.find( mensaje => mensaje.numero == 4007 );
                    resultado.ref = mkmov.Estatus;
                    return resultado;
                } else  {
                    resultado = mensajejson.find( mensaje => mensaje.numero == 0 );
                    return resultado;
                }
            }
        } // Fin Modulo INV
        return resultado;
    } // Fin mkValCamposDetalle
}
