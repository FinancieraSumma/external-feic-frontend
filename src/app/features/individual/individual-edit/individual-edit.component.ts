import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
// import { IOption } from 'ng-select';
// import { DualListComponent } from 'angular-dual-listbox';
// import { SelectOptionService } from '../../../theme/shared/components/select/select-option.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { FeicIndService } from '../../../data-services/feic/feicInd.service';
import { ConsecutivoService } from '../../../data-services/consecutivo/consecutivo.service';
import { Cfg } from '../../../config/gral.config';
import { Valfuctions } from '../../../functions/validacion.functions';
import {
  FeicCatalogos,
  FeicNuevo,
} from '../../../interfaces/feic/feic.interface';
import { FeicCatService } from '../../../data-services/feic/feicCat.service';
//import { jsPDF } from 'jspdf';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-individual-edit',
  templateUrl: './individual-edit.component.html',
  styleUrls: ['./individual-edit.component.scss'],
})
export class IndividualEditComponent implements OnInit {
  public mensajeout: any;
  public mensajeresp: any;

  // Expediente
  public frmParams: FormGroup;
  public title: string;
  public clave: string;

  // Titulares
  public frmParamsT: FormGroup;
  public tituloTitulares: string = 'Titulares';
  public titularesList: any[];
  public verCamposTitular: boolean = false;
  public verSeccionTitular: boolean = false;
  public isSubmit: boolean;
  public mkDocumentoTitular: any;
  public mkID_DocTitular: any;
  public frmParamsTit: FormGroup;
  public titulo2Titulares: string = '';

  // Titulares Datos Pep
  public DocumentosTitPEP: any[];
  public IdDocumentoTitPEP: any;
  public IdTitPEP: any;
  public frmParamsTitPEP: FormGroup;
  public verCamposTitularDatosPEP: boolean = false;
  public verTitularDatosPEP: boolean = false;
  public verResiDepartamento: boolean = false;
  // Titulares Pariente Pep
  public DocumentosTitPariPEP: any[];
  public IdDocumentoTitPariPEP: any;
  public IdTitPariPEP: any;
  public frmParamsTitPariPEP: FormGroup;
  public verCamposTitularPariPEP: boolean = false;
  public verTitularPariPEP: boolean = false;
  // Titulares Asociado Pep
  public DocumentosTitAsoPEP: any[];
  public IdDocumentoTitAsoPEP: any;
  public IdTitAsoPEP: any;
  public frmParamsTitAsoPEP: FormGroup;
  public verCamposTitularAsoPEP: boolean = false;
  public verTitularAsoPEP: boolean = false;

  //  INFORMACION ECONOMICA
  public frmParamsInfoEco: FormGroup;
  public tituloInfoEco: string = 'Informacion Economica';
  public verCamposInfEco: boolean = false;
  public verEdicionInfEco: boolean = false;
  public mkDocumentoInfoEco: any;
  public mkdocinfoEco: any;
  public id_infoEco: any;

  //  Representante
  public frmParamsRepresentante: FormGroup;
  public tituloRepresentante: string = 'Representante Legal';
  public verSeccionRepresentante: boolean = false;
  public verCamposRepresentante: boolean = false;
  public documentosRep: any;
  public docInfoRepresentante: any;
  public ID_DocumentoRepresentante: any;

  // Representante Datos Pep
  public DocumentosRepPEP: any[];
  public IdDocumentoRepPEP: any;
  public IdRepPEP: any;
  public frmParamsRepPEP: FormGroup;
  public verCamposRepDatosPEP: boolean = false;
  public verRepDatosPEP: boolean = false;

  // Representante Pariente Pep
  public DocumentosRepPariPEP: any[];
  public IdDocumentoRepPariPEP: any;
  public IdRepPariPEP: any;
  public frmParamsRepPariPEP: FormGroup;
  public verCamposRepPariPEP: boolean = false;
  public verRepPariPEP: boolean = false;

  // Representante Asociado Pep
  public DocumentosRepAsoPEP: any[];
  public IdDocumentoRepAsoPEP: any;
  public IdRepAsoPEP: any;
  public frmParamsRepAsoPEP: FormGroup;
  public verCamposRepAsoPEP: boolean = false;
  public verRepAsoPEP: boolean = false;

  public verTLdepartamento: boolean = false;
  public verTPaisPasaporte: boolean = false;
  public verNdepartamento: boolean = false;

  public hoy = new Date();
  public procesando: boolean = false;
  public mk_id: number;
  public mkid: number;
  public identity: any;
  public feicCatalogos: FeicCatalogos;
  public feicNuevo: FeicNuevo;
  public devempresa: string;
  public mkestatuslist: any;
  public mkdocIniio: any;
  public mkdocmaster: any;

  //Catalogos FEIC
  public catPais: any[];
  public catDepto: any[];
  public catMunicipio: any[];
  public catMunicipiofilter: any[];
  public catMunicipiofilterNac: any[];
  public catResiMunicipiofilter: any[];
  public catTipoEntidad: any[];
  public catDetTipoEntidad: any[];
  public catDetTipoEntidadFiltro: any[];
  public catCondicionMig: any[];
  public catPerentescoPep: any[];
  public catMovAsociacionPep: any[];
  public catOrigenRiqPep: any[];
  public catMoneda: any[];
  public catPaisPasaporte: any[];
  public catPaisNac: any[];
  public catDeptoNac: any[];

  public cat_tipoDocIde: any[];
  public cat_sexo: any[];
  public cat_estadoCivil: any[];
  public cat_condicion: any[];
  public cat_sector: any[];

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};

  public mkestatusLista = [];
  public mkempresaLista = [];

  public val_calidadActual: boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _feicIndService: FeicIndService,
    private _rutaActiva: ActivatedRoute,
    private _consecutivoService: ConsecutivoService,
    private _feicCatService: FeicCatService,
    private _spinner: NgxSpinnerService
  ) {
    this.devempresa = Cfg.devempresa;
    this.mkestatusLista = Cfg.listaEstatus;
    this.mkempresaLista = Cfg.listaEmpresas;

    //this.identity = JSON.parse(localStorage.getItem('identity'));
    this.isSubmit = false;
    this.feicCatalogos = {
      usuario: 'AJOLON',
      catalogo: '',
    };
    this.feicNuevo = {
      idpadre: 0,
      clave: '',
    };
  }

  async getMonitorCambios() {
    this.frmParamsTit.get(['cliente']).valueChanges.subscribe((ctedata) => {
      ctedata.pep == 'S'
        ? (this.verTitularDatosPEP = true)
        : (this.verTitularDatosPEP = false);
      ctedata.parientePep == 'S'
        ? (this.verTitularPariPEP = true)
        : (this.verTitularPariPEP = false);
      ctedata.asociadoPep == 'S'
        ? (this.verTitularAsoPEP = true)
        : (this.verTitularAsoPEP = false);
      ctedata.tipoDocumentoIdentificacion == 'P'
        ? (this.verTPaisPasaporte = true)
        : (this.verTPaisPasaporte = false);

      // CLIENTE NACIMIENTO
      if (ctedata.nacimiento.pais == 'GT') {
        this.verNdepartamento = true;
        this.catMunicipiofilterNac = this.catMunicipio.filter(
          (x) => x.raiz == ctedata.nacimiento.departamento
        );
      } else {
        this.verNdepartamento = false;
      }
      // CLIENTE RESIDENCIA
      if (ctedata.residencia.pais == 'GT') {
        this.verResiDepartamento = true;
        this.catResiMunicipiofilter = this.catMunicipio.filter(
          (x) => x.raiz == ctedata.residencia.departamento
        );
      } else {
        this.verResiDepartamento = false;
      }
    });

    this.frmParamsTit.get(['lugar']).valueChanges.subscribe((ldata) => {
      // LUGAR
      if (ldata.pais == 'GT') {
        this.verTLdepartamento = true;
        this.catMunicipiofilter = this.catMunicipio.filter(
          (x) => x.raiz == ldata.departamento
        );
      } else {
        this.verTLdepartamento = false;
      }
    });

    this.frmParamsTit
      .get(['tipoActuacion'])
      .valueChanges.subscribe((tadata) => {
        tadata == 'N'
          ? (this.verSeccionRepresentante = true)
          : (this.verSeccionRepresentante = false);
        tadata == 'S'
          ? (this.val_calidadActual = false)
          : (this.val_calidadActual = true);
      });

    this.frmParamsRepresentante
      .get(['pep'])
      .valueChanges.subscribe((rddata) => {
        rddata == 'S'
          ? (this.verRepDatosPEP = true)
          : (this.verRepDatosPEP = false);
      });

    this.frmParamsRepresentante
      .get(['parientePep'])
      .valueChanges.subscribe((rpdata) => {
        rpdata == 'S'
          ? (this.verRepPariPEP = true)
          : (this.verRepPariPEP = false);
      });

    this.frmParamsRepresentante
      .get(['asociadoPep'])
      .valueChanges.subscribe((radata) => {
        radata == 'S'
          ? (this.verRepAsoPEP = true)
          : (this.verRepPariPEP = false);
      });
  }

  async getFeicCat() {
    this.feicCatalogos.catalogo = 'Pais';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catPais = response;
      // console.log(this.catPais);
      this.catPaisPasaporte = response;
      this.catPaisNac = response;
    });

    this.feicCatalogos.catalogo = 'Departamentos';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catDepto = response;
      this.catDeptoNac = response;
    });

    this.feicCatalogos.catalogo = 'Municipios';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catMunicipio = response;
    });

    this.feicCatalogos.catalogo = 'TipoEntidad';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catTipoEntidad = response;
    });

    this.feicCatalogos.catalogo = 'DetTipoEntidad';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catDetTipoEntidad = response;
    });
    this.feicCatalogos.catalogo = 'CondicionMig';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catCondicionMig = response;
    });

    this.feicCatalogos.catalogo = 'PerentescoPep';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catPerentescoPep = response;
    });

    this.feicCatalogos.catalogo = 'MovAsociacionPep';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catMovAsociacionPep = response;
    });

    this.feicCatalogos.catalogo = 'OrigenRiqPep';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catOrigenRiqPep = response;
    });

    this.feicCatalogos.catalogo = 'moneda';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.catMoneda = response;
    });

    this.feicCatalogos.catalogo = 'tipoDocIde';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.cat_tipoDocIde = response;
    });

    this.feicCatalogos.catalogo = 'sexo';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.cat_sexo = response;
    });

    this.feicCatalogos.catalogo = 'estadoCivil';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.cat_estadoCivil = response;
    });

    this.feicCatalogos.catalogo = 'condicion';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.cat_condicion = response;
    });

    this.feicCatalogos.catalogo = 'sector';
    this._feicCatService.list(this.feicCatalogos).subscribe((response) => {
      this.cat_sector = response;
    });
  }

  ngOnInit(): void {
    //this.mk_id = this._rutaActiva.snapshot.params.id;
    this.mk_id = 0;
    this.getFeicCat();
    this.ctrFormParams();
    this.ctrFormParamsTit();
    this.ctrFormParamsTitPEP();
    this.ctrFormParamsTitPariPEP();
    this.ctrFormParamsTitAsoPEP();
    this.ctrFormParamsInfoEco();
    this.ctrFormParamsInfoRep();
    this.ctrFormParamsRepPEP();
    this.ctrFormParamsRepPariPEP();
    this.ctrFormParamsRepAsoPEP();
    this.getMonitorCambios();

    if (this.mk_id == 0) {
      this.title = 'Nuevo Expediente FEIC persona individual';
      this._consecutivoService.consecutivo_actualizar('Individual').subscribe(
        (response) => {
          if (response) {
            this.clave = response.prefijo + response.numero + response.sufijo;
            this.mkid = response.numero;
            this.frmParams.controls['_id'].setValue(0);
            this.frmParams.controls['mkid'].setValue(this.mkid);
            this.frmParams.controls['clave'].setValue(this.clave);
            this.frmParams.controls['estatus'].setValue('BORRADOR');
            //this.frmParams.controls['fechaCambio'].setValue(moment());
            //this.frmParams.controls['usuarioCambio'].setValue(this.identity.Usuario);
            this.frmParams.controls['accion'].setValue('NUEVO');
            this.frmParams.controls['observaciones'].setValue('');
            this.frmParams.controls['referencia'].setValue('');
          }
        },
        (error) => {
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
    } else {
      this.verSeccionTitular = true;
      this._feicIndService.pimaster_uno(this.mk_id).subscribe(
        (response) => {
          if (response) {
            this.mkdocmaster = response;
            this.clave = this.mkdocmaster.clave;
            this.accTitularList();
            this.accTitPEPList();
            this.accTitParienteList();
            this.accTitAsociadoList();
            this.accInfoEcoList();

            this.title =
              'Expediente FEIC persona individual ' + this.mkdocmaster.clave;

            this.frmParams.controls['_id'].setValue(this.mkdocmaster._id);
            this.frmParams.controls['mkid'].setValue(this.mkdocmaster.mkid);
            this.frmParams.controls['clave'].setValue(this.mkdocmaster.clave);
            this.frmParams.controls['estatus'].setValue(
              this.mkdocmaster.estatus
            );
            this.frmParams.controls['empresa'].setValue(
              this.mkdocmaster.empresa
            );
            this.frmParams.controls['sucursal'].setValue(
              this.mkdocmaster.sucursal
            );
            this.frmParams.controls['usuario'].setValue(
              this.mkdocmaster.usuario
            );
            this.frmParams.controls['observaciones'].setValue(
              this.mkdocmaster.observaciones
            );
            this.frmParams.controls['referencia'].setValue(
              this.mkdocmaster.referencia
            );
            this.frmParams.controls['fechaEmision'].setValue(
              moment(this.mkdocmaster.fechaEmision).format('YYYY-MM-DD')
            );
            this.frmParams.controls['idioma'].setValue('es');
            this.frmParams.controls['suscripcion'].setValue(
              this.identity.Suscripcion
            );
            this.frmParams.controls['modulo'].setValue('INDIVIDUAL');
            this.frmParams.controls['documento'].setValue('PERSONA INDIVIDUAL');
            this.frmParams.controls['accion'].setValue('ACTUALIZAR');
          }
        },
        (error) => {
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
    }
  }

  // MASTER
  async botonEliminarMaster() {
    this.mensajeout = await Valfuctions.mkValEspecifico(3001, 'es', this.clave);
    Swal.fire({
      title: this.mensajeout.titulo,
      text:
        this.mensajeout.mensaje + ' <br> Expediente: ' + this.mensajeout.ref,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.pimaster_borrar(this.mk_id).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );

              this._router.navigate(['/feic/individual']);
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });

    //}
  }
  async botonGuardarMaster() {
    this._spinner.show();
    if (this.mk_id == 0) {
      //console.log(this.frmParams.value);
      this._feicIndService.pimaster_nuevo(this.frmParams.value).subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this._router.navigate(['/feic/individual']);
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
    } else {
      // procesar
      this._feicIndService
        .pimaster_actualizar(this.mk_id, this.frmParams.value)
        .subscribe(
          (response) => {
            if (response) {
              this._spinner.hide();
              this.mensajeout = response;
              this.procesando = false;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
            }
          },
          (error) => {
            this._spinner.hide();
            this.procesando = false;
            this.mensajeresp = <any>error.error;
            if (this.mensajeresp != null) {
              Swal.fire(
                this.mensajeresp.titulo,
                this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
                this.mensajeresp.tipo
              );
            } else {
              this.mensajeout = Valfuctions.mkValEspecifico(
                4018,
                this.identity.idioma,
                ''
              );
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
            }
          }
        );
    }
  }
  // TITULAR

  async accTitularList() {
    this.feicNuevo.idpadre = this.mk_id;
    this.feicNuevo.clave = 'Titular';
    this._feicIndService
      .pititular_list(this.feicNuevo)
      .subscribe((responsetit) => {
        if (responsetit) {
          this.titularesList = responsetit;
        }
      });
  }
  async botonNuevoTitular() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.mk_id;
    this.feicNuevo.clave = 'Titular';

    this._feicIndService
      .pititular_nuevo(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this._spinner.hide();
          this.mensajeresp = response;
          this.procesando = false;
          Swal.fire(
            this.mensajeresp.titulo,
            this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
            this.mensajeresp.tipo
          );
          this.accTitularList();
          this.verCamposTitular = false;
          this.verCamposTitularDatosPEP = false;
          this.verCamposTitularAsoPEP = false;
          this.verCamposTitularPariPEP = false;
        }
      });
  }
  async botonEditarTitular(iID) {
    this.mkID_DocTitular = iID;
    this._feicIndService.pititular_uno(iID).subscribe((resTitular) => {
      if (resTitular) {
        this.mkDocumentoTitular = resTitular;
        this.frmParamsTit.controls['_id'].setValue(this.mkDocumentoTitular._id);

        this.frmParamsTit.controls['idpadre'].setValue(
          this.mkDocumentoTitular.idpadre
        );
        this.frmParamsTit.controls['mkid'].setValue(
          this.mkDocumentoTitular.mkid
        );

        this.frmParamsTit.controls['clave'].setValue(
          this.mkDocumentoTitular.clave
        );
        this.frmParamsTit.controls['tipoActuacion'].setValue(
          this.mkDocumentoTitular.tipoActuacion
        );
        this.frmParamsTit.controls['calidadActual'].setValue(
          this.mkDocumentoTitular.calidadActual
        );
        this.frmParamsTit.controls['fecha'].setValue(
          this.mkDocumentoTitular.fecha
        );
        this.frmParamsTit.controls['lugar'].setValue(
          this.mkDocumentoTitular.lugar
        );
        this.frmParamsTit.controls['cliente'].setValue(
          this.mkDocumentoTitular.cliente
        );
        // this.frmParamsTit.controls['cpe'].setValue(this.mkDocumentoTitular.cpe);
        this.tituloTitulares = 'Titulares ' + this.mkID_DocTitular;
        this.accTitPEPList();
        this.accTitAsociadoList();
        this.accTitParienteList();

        this.accInfoRepList();
        this.verCamposTitular = true;

        this.accInfoEcoList();
        this.verEdicionInfEco = false;
        this.verCamposInfEco = true;
      }
    });
  }
  async botonOcultarTitular() {
    this.verCamposTitular = false;
    this.verCamposTitularDatosPEP = false;
    this.verCamposTitularAsoPEP = false;
    this.verCamposTitularPariPEP = false;
  }
  async botonGuardarTitular() {
    console.log(this.frmParamsTit.value);
    this._feicIndService
      .pititular_actualizar(
        this.frmParamsTit.get(['_id']).value,
        this.frmParamsTit.value
      )
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;

            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposTitular = false;
            this.verCamposTitularDatosPEP = false;
            this.verCamposTitularAsoPEP = false;
            this.verCamposTitularPariPEP = false;
            this.tituloTitulares = 'Titulares ';
            this.isSubmit = true;
          }
        },
        (error) => {
          this._spinner.hide();

          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonBorrarTitular() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.mkID_DocTitular
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.pititular_borrar(this.mkID_DocTitular).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accTitularList();
              this.verCamposTitular = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // TITULAR Datos PEP
  async accTitPEPList() {
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularDatosPep';
    this._feicIndService.Pep_list(this.feicNuevo).subscribe((restitDpep) => {
      if (restitDpep) {
        this.DocumentosTitPEP = restitDpep;
      }
    });
  }
  async botonNuevoTitPEP() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularDatosPep';

    this._feicIndService.Pep_nuevo(this.feicNuevo).subscribe((response) => {
      if (response) {
        this._spinner.hide();
        this.mensajeresp = response;
        Swal.fire(
          this.mensajeresp.titulo,
          this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
          this.mensajeresp.tipo
        );
        this.accTitPEPList();
        this.verCamposTitularDatosPEP = false;
      }
    });
  }
  async botonEditarTitPEP(iID) {
    this.IdTitPEP = iID;
    this._feicIndService.Pep_uno(iID).subscribe((response) => {
      if (response) {
        this.IdDocumentoTitPEP = response;
        this.frmParamsTitPEP.controls['_id'].setValue(
          this.IdDocumentoTitPEP._id
        );
        this.frmParamsTitPEP.controls['idpadre'].setValue(
          this.IdDocumentoTitPEP.idpadre
        );

        this.frmParamsTitPEP.controls['clave'].setValue(
          this.IdDocumentoTitPEP.clave
        );
        this.frmParamsTitPEP.controls['entidad'].setValue(
          this.IdDocumentoTitPEP.entidad
        );
        this.frmParamsTitPEP.controls['puestoDesempenia'].setValue(
          this.IdDocumentoTitPEP.puestoDesempenia
        );
        this.frmParamsTitPEP.controls['paisEntidad'].setValue(
          this.IdDocumentoTitPEP.paisEntidad
        );
        this.frmParamsTitPEP.controls['origenRiqueza'].setValue(
          this.IdDocumentoTitPEP.origenRiqueza
        );
        this.frmParamsTitPEP.controls['otroOrigenRiqueza'].setValue(
          this.IdDocumentoTitPEP.otroOrigenRiqueza
        );
        this.verCamposTitularDatosPEP = true;
      }
    });
  }
  async botonOcultarTitPEP() {
    this.verCamposTitularDatosPEP = false;
  }
  async botonGuardarTitPEP() {
    this._feicIndService
      .Pep_actualizar(
        this.frmParamsTitPEP.get(['_id']).value,
        this.frmParamsTitPEP.value
      )
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposTitularDatosPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarTitPEP() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.frmParamsTitPEP.get(['_id']).value
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService
          .Pep_borrar(this.frmParamsTitPEP.get(['_id']).value)
          .subscribe(
            (response) => {
              if (response) {
                this.mensajeout = response;
                Swal.fire(
                  this.mensajeout.titulo,
                  this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                  this.mensajeout.tipo
                );
                this.accTitPEPList();
                this.verCamposTitularDatosPEP = false;
              }
            },
            (error) => {
              var errorMessage = <any>error;
              if (errorMessage != null) {
                var mkerrores = JSON.parse(error._body);
                Swal.fire(this.devempresa, mkerrores.message, 'error');
              }
            }
          );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // TITULAR Pariente PEP
  async accTitParienteList() {
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularParientePep';
    this._feicIndService
      .parientePep_list(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this.DocumentosTitPariPEP = response;
        }
      });
  }
  async botonNuevoTitPariente() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularParientePep';

    this._feicIndService
      .parientePep_nuevo(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this._spinner.hide();
          this.mensajeresp = response;
          Swal.fire(
            this.mensajeresp.titulo,
            this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
            this.mensajeresp.tipo
          );
          this.accTitParienteList();
          this.verCamposTitularPariPEP = false;
        }
      });
  }
  async botonEditarTitPariente(iID) {
    this.IdTitPariPEP = iID;
    this._feicIndService.parientePep_uno(iID).subscribe((response) => {
      if (response) {
        this.IdDocumentoTitPariPEP = response;
        this.frmParamsTitPariPEP.controls['_id'].setValue(
          this.IdDocumentoTitPariPEP._id
        );
        this.frmParamsTitPariPEP.controls['idpadre'].setValue(
          this.IdDocumentoTitPariPEP.idpadre
        );
        this.frmParamsTitPariPEP.controls['clave'].setValue(
          this.IdDocumentoTitPariPEP.clave
        );
        this.frmParamsTitPariPEP.controls['parentesco'].setValue(
          this.IdDocumentoTitPariPEP.parentesco
        );
        this.frmParamsTitPariPEP.controls['otroParentesco'].setValue(
          this.IdDocumentoTitPariPEP.otroParentesco
        );
        this.frmParamsTitPariPEP
          .get(['complementoPAPEP'])
          .setValue(this.IdDocumentoTitPariPEP.complementoPAPEP);
        this.verCamposTitularPariPEP = true;
      }
    });
  }
  async botonOcultarTitPariente() {
    this.verCamposTitularPariPEP = false;
  }
  async botonGuardarTitPariente() {
    this._feicIndService
      .parientePep_actualizar(this.IdTitPariPEP, this.frmParamsTitPariPEP.value)
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposTitularPariPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarTitPariente() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.IdTitPariPEP
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.parientePep_borrar(this.IdTitPariPEP).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accTitParienteList();
              this.verCamposTitularPariPEP = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // TITULAR Asociado PEP
  async accTitAsociadoList() {
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularAsociadoPep';
    this._feicIndService
      .asociadoPep_list(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this.DocumentosTitAsoPEP = response;
        }
      });
  }
  async botonNuevoTitAsociado() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'titularAsociadoPep';

    this._feicIndService
      .asociadoPep_nuevo(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this._spinner.hide();
          this.mensajeresp = response;
          this.procesando = false;
          Swal.fire(
            this.mensajeresp.titulo,
            this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
            this.mensajeresp.tipo
          );
          this.accTitAsociadoList();
          this.verCamposTitularAsoPEP = false;
        }
      });
  }
  async botonEditarTitAsociado(iID) {
    this._feicIndService.asociadoPep_uno(iID).subscribe((response) => {
      if (response) {
        this.IdTitAsoPEP = iID;
        this.IdDocumentoTitAsoPEP = response;
        this.frmParamsTitAsoPEP.controls['_id'].setValue(
          this.IdDocumentoTitAsoPEP._id
        );
        this.frmParamsTitAsoPEP.controls['idpadre'].setValue(
          this.IdDocumentoTitAsoPEP.idpadre
        );

        this.frmParamsTitAsoPEP.controls['clave'].setValue(
          this.IdDocumentoTitAsoPEP.clave
        );

        this.frmParamsTitAsoPEP.controls['motivoAsociacion'].setValue(
          this.IdDocumentoTitAsoPEP.motivoAsociacion
        );
        this.frmParamsTitAsoPEP.controls['otroMotivoAsociacion'].setValue(
          this.IdDocumentoTitAsoPEP.otroMotivoAsociacion
        );
        this.frmParamsTitAsoPEP.controls['complementoPAPEP'].setValue(
          this.IdDocumentoTitAsoPEP.complementoPAPEP
        );
        this.verCamposTitularAsoPEP = true;
      }
    });
  }
  async botonOcultarTitAsociado() {
    this.verCamposTitularAsoPEP = false;
  }
  async botonGuardarTitAsociado() {
    this._feicIndService
      .asociadoPep_actualizar(this.IdTitAsoPEP, this.frmParamsTitAsoPEP.value)
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposTitularAsoPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarTitAsociado() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.IdTitAsoPEP
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.asociadoPep_borrar(this.IdTitAsoPEP).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accTitAsociadoList();
              this.verCamposTitularAsoPEP = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // Array de montoEngresos inicio
  montoEgresos(): FormArray {
    return this.frmParamsInfoEco.get(['montoEgresos']) as FormArray;
  }
  new_montoEgresos(): FormGroup {
    return this._fb.group({
      moneda: '',
      monto: '',
    });
  }
  add_montoEgresos() {
    this.montoEgresos().push(this.new_montoEgresos());
  }
  del_montoEgresos(meIndex: number) {
    this.montoEgresos().removeAt(meIndex);
  }
  // Array de relacionDependencia inicio
  otrosIngresos(): FormArray {
    return this.frmParamsInfoEco.get(['otrosIngresos']) as FormArray;
  }
  new_otrosIngresos(): FormGroup {
    return this._fb.group({
      otrasFuentesIngreso: '',
    });
  }
  add_otrosIngresos() {
    this.otrosIngresos().push(this.new_otrosIngresos());
  }
  del_otrosIngresos(oiIndex: number) {
    this.otrosIngresos().removeAt(oiIndex);
  }
  // Array de relacionDependencia inicio
  relacionDependencia(): FormArray {
    return this.frmParamsInfoEco.get(['relacionDependencia']) as FormArray;
  }
  new_relacionDependencia(): FormGroup {
    return this._fb.group({
      nombreEmpleador: '',
    });
  }
  add_relacionDependencia() {
    this.relacionDependencia().push(this.new_relacionDependencia());
  }
  del_relacionDependencia(rdIndex: number) {
    this.relacionDependencia().removeAt(rdIndex);
  }
  // Array de negocioPropio inicio
  negocioPropio(): FormArray {
    return this.frmParamsInfoEco.get(['negocioPropio']) as FormArray;
  }
  new_negocioPropio(): FormGroup {
    return this._fb.group({
      nombreComercial: '',
    });
  }
  add_negocioPropio() {
    this.negocioPropio().push(this.new_negocioPropio());
  }
  del_negocioPropio(npIndex: number) {
    this.montoIngresos().removeAt(npIndex);
  }
  // Array de infoEconomicaEmpresa inicio
  montoIngresos(): FormArray {
    return this.frmParamsInfoEco.get(['montoIngresos']) as FormArray;
  }
  new_montoIngresos(): FormGroup {
    return this._fb.group({
      moneda: '',
      monto: '',
    });
  }
  add_montoIngresos() {
    this.montoIngresos().push(this.new_montoIngresos());
  }
  del_montoIngresos(miIndex: number) {
    this.montoIngresos().removeAt(miIndex);
  }

  // INFO ECONOMICA
  async accInfoEcoList() {
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'TitularInfoEco';
    this._feicIndService.infoEco_list(this.feicNuevo).subscribe((response) => {
      if (response) {
        this.mkDocumentoInfoEco = response;
      }
    });
  }
  async botonNuevoInfoEco() {
    // this.mkDocumentoInfoEco
    // if (this.mkDocumentoInfoEco.length==0 ){
    this._spinner.show();
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'TitularInfoEco';

    this._feicIndService.infoEco_nuevo(this.feicNuevo).subscribe((response) => {
      if (response) {
        this._spinner.hide();
        this.mensajeresp = response;
        Swal.fire(
          this.mensajeresp.titulo,
          this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
          this.mensajeresp.tipo
        );
        this.accInfoEcoList();
        this.verEdicionInfEco = false;
      }
    });
    // } else {
    //   this.mensajeout = Valfuctions.mkValEspecifico(4027,'es', 'Informació Economica');
    //   Swal.fire(this.mensajeout.titulo, this.mensajeout.mensaje + " " + this.mensajeout.ref, this.mensajeout.tipo);

    // }
  }
  async botonEditarInfoEco(iID) {
    this.id_infoEco = iID;
    this.frmParamsInfoEco.reset();
    this._feicIndService.infoEco_uno(iID).subscribe((response) => {
      if (response) {
        this.mkdocinfoEco = response;

        this.frmParamsInfoEco.setControl('montoIngresos', this._fb.array([]));
        this.frmParamsInfoEco.setControl('negocioPropio', this._fb.array([]));
        this.frmParamsInfoEco.setControl(
          'relacionDependencia',
          this._fb.array([])
        );
        this.frmParamsInfoEco.setControl('otrosIngresos', this._fb.array([]));
        this.frmParamsInfoEco.setControl('montoEgresos', this._fb.array([]));

        this.frmParamsInfoEco.controls['montoIngresos'].setValue([]);
        this.frmParamsInfoEco.controls['_id'].setValue(this.mkdocinfoEco._id);
        this.frmParamsInfoEco.controls['idpadre'].setValue(
          this.mkdocinfoEco.idpadre
        );
        this.frmParamsInfoEco.controls['clave'].setValue(
          this.mkdocinfoEco.clave
        );

        this.frmParamsInfoEco.controls['fecha'].setValue(
          this.mkdocinfoEco.fecha
        );
        this.frmParamsInfoEco.controls['actividadEconomica'].setValue(
          this.mkdocinfoEco.actividadEconomica
        );

        this.mkdocinfoEco.montoIngresos.forEach((mi) => {
          (<FormArray>this.frmParamsInfoEco.controls['montoIngresos']).push(
            this._fb.group({
              moneda: new FormControl(mi.moneda),
              monto: new FormControl(mi.monto),
            })
          );
        });

        this.mkdocinfoEco.negocioPropio.forEach((np) => {
          (<FormArray>this.frmParamsInfoEco.controls['negocioPropio']).push(
            this._fb.group({
              nombreComercial: new FormControl(np.nombreComercial),
            })
          );
        });

        this.mkdocinfoEco.relacionDependencia.forEach((rd) => {
          (<FormArray>(
            this.frmParamsInfoEco.controls['relacionDependencia']
          )).push(
            this._fb.group({
              nombreEmpleador: new FormControl(rd.nombreEmpleador),
            })
          );
        });

        this.mkdocinfoEco.otrosIngresos.forEach((ofi) => {
          (<FormArray>this.frmParamsInfoEco.controls['otrosIngresos']).push(
            this._fb.group({
              otrasFuentesIngreso: new FormControl(ofi.otrasFuentesIngreso),
            })
          );
        });
        this.mkdocinfoEco.montoEgresos.forEach((me) => {
          (<FormArray>this.frmParamsInfoEco.controls['montoEgresos']).push(
            this._fb.group({
              moneda: new FormControl(me.moneda),
              monto: new FormControl(me.monto),
            })
          );
        });

        this.frmParamsInfoEco.controls['fuenteIngreso'].setValue(
          this.mkdocinfoEco.fuenteIngreso
        );

        this.frmParamsInfoEco.controls['propositoRC'].setValue(
          this.mkdocinfoEco.propositoRC
        );

        this.verEdicionInfEco = true;
      }
    });
  }
  async botonOcultarInfoEco() {
    this.verEdicionInfEco = false;
  }
  async botonGuardarInfoEco() {
    this._feicIndService
      .infoEco_actualizar(
        this.frmParamsInfoEco.get(['_id']).value,
        this.frmParamsInfoEco.value
      )
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.accInfoEcoList();
            this.verEdicionInfEco = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonBorrarInfoEco() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.id_infoEco
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.infoEco_borrar(this.id_infoEco).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accInfoEcoList();
              this.verEdicionInfEco = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // INFO REPRESENTANTE
  async accInfoRepList() {
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'TitularRepresentante';
    this._feicIndService
      .infoRep_list(this.feicNuevo)
      .subscribe((resRepresentante) => {
        if (resRepresentante) {
          this.documentosRep = resRepresentante;
        }
      });
  }
  async botonNuevoInfoRep() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.mkID_DocTitular;
    this.feicNuevo.clave = 'TitularRepresentante';
    this._feicIndService.infoRep_nuevo(this.feicNuevo).subscribe((response) => {
      if (response) {
        this._spinner.hide();
        this.mensajeresp = response;
        Swal.fire(
          this.mensajeresp.titulo,
          this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
          this.mensajeresp.tipo
        );
        this.accInfoRepList();
        this.verCamposRepresentante = false;
      }
    });
  }
  async botonEditarInfoRep(iID) {
    this.ID_DocumentoRepresentante = iID;
    this._feicIndService.infoRep_uno(iID).subscribe((resRepre) => {
      if (resRepre) {
        this.docInfoRepresentante = resRepre;
        this.frmParamsRepresentante.controls['_id'].setValue(
          this.docInfoRepresentante._id
        );
        this.frmParamsRepresentante.controls['idpadre'].setValue(
          this.docInfoRepresentante.idpadre
        );
        this.frmParamsRepresentante.controls['clave'].setValue(
          this.docInfoRepresentante.clave
        );

        this.frmParamsRepresentante.controls['primerApellido'].setValue(
          this.docInfoRepresentante.primerApellido
        );
        this.frmParamsRepresentante.controls['segundoApellido'].setValue(
          this.docInfoRepresentante.segundoApellido
        );
        this.frmParamsRepresentante.controls['apellidoCasada'].setValue(
          this.docInfoRepresentante.apellidoCasada
        );
        this.frmParamsRepresentante.controls['primerNombre'].setValue(
          this.docInfoRepresentante.primerNombre
        );
        this.frmParamsRepresentante.controls['segundoNombre'].setValue(
          this.docInfoRepresentante.segundoNombre
        );
        this.frmParamsRepresentante.controls['otrosNombres'].setValue(
          this.docInfoRepresentante.otrosNombres
        );
        this.frmParamsRepresentante.controls['fechaNacimiento'].setValue(
          this.docInfoRepresentante.fechaNacimiento
        );
        this.frmParamsRepresentante.controls['nacionalidades'].setValue(
          this.docInfoRepresentante.nacionalidades
        );
        this.frmParamsRepresentante.controls['nacimiento'].setValue(
          this.docInfoRepresentante.nacimiento
        );
        this.frmParamsRepresentante.controls['condicionMigratoria'].setValue(
          this.docInfoRepresentante.condicionMigratoria
        );
        this.frmParamsRepresentante.controls[
          'otraCondicionMigratoria'
        ].setValue(this.docInfoRepresentante.otraCondicionMigratoria);
        this.frmParamsRepresentante.controls['sexo'].setValue(
          this.docInfoRepresentante.sexo
        );
        this.frmParamsRepresentante.controls['estadoCivil'].setValue(
          this.docInfoRepresentante.estadoCivil
        );
        this.frmParamsRepresentante.controls['profesionOficio'].setValue(
          this.docInfoRepresentante.profesionOficio
        );
        this.frmParamsRepresentante.controls[
          'tipoDocumentoIdentificacion'
        ].setValue(this.docInfoRepresentante.tipoDocumentoIdentificacion);
        this.frmParamsRepresentante.controls[
          'numeroDocumentoIdentificacion'
        ].setValue(this.docInfoRepresentante.numeroDocumentoIdentificacion);
        this.frmParamsRepresentante.controls['emisionPasaporte'].setValue(
          this.docInfoRepresentante.emisionPasaporte
        );
        this.frmParamsRepresentante.controls['nit'].setValue(
          this.docInfoRepresentante.nit
        );

        this.frmParamsRepresentante.controls['telefonos'].setValue(
          this.docInfoRepresentante.telefonos
        );

        this.frmParamsRepresentante.controls['email'].setValue(
          this.docInfoRepresentante.email
        );
        this.frmParamsRepresentante.controls['direccionResidencia'].setValue(
          this.docInfoRepresentante.direccionResidencia
        );
        this.frmParamsRepresentante.controls['residencia'].setValue(
          this.docInfoRepresentante.residencia
        );
        this.frmParamsRepresentante.controls['pep'].setValue(
          this.docInfoRepresentante.pep
        );
        this.frmParamsRepresentante.controls['parientePep'].setValue(
          this.docInfoRepresentante.parientePep
        );
        this.frmParamsRepresentante.controls['asociadoPep'].setValue(
          this.docInfoRepresentante.asociadoPep
        );
        this.frmParamsRepresentante.controls['cpe'].setValue(
          this.docInfoRepresentante.cpe
        );
        this.accRepPEPList();
        this.accRepParienteList();
        this.accRepAsociadoList();
        this.verCamposRepresentante = true;
      }
    });
  }
  async botonOcultarInfoRep() {
    this.verCamposRepresentante = false;
    this.verCamposRepDatosPEP = false;
    this.verCamposRepAsoPEP = false;
    this.verCamposRepPariPEP = false;
  }
  async botonGuardarInfoRep() {
    console.log(this.ID_DocumentoRepresentante);
    this._feicIndService
      .infoRep_actualizar(
        this.ID_DocumentoRepresentante,
        this.frmParamsRepresentante.value
      )
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.accInfoEcoList();
            this.verCamposRepresentante = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonBorrarInfoRep() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.ID_DocumentoRepresentante
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService
          .infoRep_borrar(this.ID_DocumentoRepresentante)
          .subscribe(
            (response) => {
              if (response) {
                this.mensajeout = response;
                Swal.fire(
                  this.mensajeout.titulo,
                  this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                  this.mensajeout.tipo
                );
                this.accInfoRepList();
                this.verCamposRepresentante = false;
              }
            },
            (error) => {
              var errorMessage = <any>error;
              if (errorMessage != null) {
                var mkerrores = JSON.parse(error._body);
                Swal.fire(this.devempresa, mkerrores.message, 'error');
              }
            }
          );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // REPRESENTANTE Datos PEP
  async accRepPEPList() {
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'RepresentanteDatosPep';
    this._feicIndService.Pep_list(this.feicNuevo).subscribe((resRepDpep) => {
      if (resRepDpep) {
        this.DocumentosRepPEP = resRepDpep;
      }
    });
  }
  async botonNuevoRepPEP() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'RepresentanteDatosPep';

    this._feicIndService.Pep_nuevo(this.feicNuevo).subscribe((response) => {
      if (response) {
        this._spinner.hide();
        this.mensajeresp = response;
        Swal.fire(
          this.mensajeresp.titulo,
          this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
          this.mensajeresp.tipo
        );
        this.accRepPEPList();
        this.verCamposRepDatosPEP = false;
      }
    });
  }
  async botonEditarRepPEP(iID) {
    this.IdRepPEP = iID;
    this._feicIndService.Pep_uno(iID).subscribe((response) => {
      if (response) {
        this.IdDocumentoRepPEP = response;
        this.frmParamsRepPEP.controls['_id'].setValue(
          this.IdDocumentoRepPEP._id
        );
        this.frmParamsRepPEP.controls['idpadre'].setValue(
          this.IdDocumentoRepPEP.idpadre
        );

        this.frmParamsRepPEP.controls['clave'].setValue(
          this.IdDocumentoRepPEP.clave
        );
        this.frmParamsRepPEP.controls['entidad'].setValue(
          this.IdDocumentoRepPEP.entidad
        );
        this.frmParamsRepPEP.controls['puestoDesempenia'].setValue(
          this.IdDocumentoRepPEP.puestoDesempenia
        );
        this.frmParamsRepPEP.controls['paisEntidad'].setValue(
          this.IdDocumentoRepPEP.paisEntidad
        );
        this.frmParamsRepPEP.controls['origenRiqueza'].setValue(
          this.IdDocumentoRepPEP.origenRiqueza
        );
        this.frmParamsRepPEP.controls['otroOrigenRiqueza'].setValue(
          this.IdDocumentoRepPEP.otroOrigenRiqueza
        );
        this.verCamposRepDatosPEP = true;
      }
    });
  }
  async botonOcultarRepPEP() {
    this.verCamposRepDatosPEP = false;
  }
  async botonGuardarRepPEP() {
    console.log(this.frmParamsRepPEP.value);
    this._feicIndService
      .Pep_actualizar(this.IdRepPEP, this.frmParamsRepPEP.value)
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposRepDatosPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarRepPEP() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.IdRepPEP
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.Pep_borrar(this.IdRepPEP).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accRepPEPList();
              this.verCamposRepDatosPEP = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // REPRESENTANTE Pariente PEP
  async accRepParienteList() {
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'RepresentanteParientePep';
    this._feicIndService
      .parientePep_list(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this.DocumentosRepPariPEP = response;
        }
      });
  }
  async botonNuevoRepPariente() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'RepresentanteParientePep';

    this._feicIndService
      .parientePep_nuevo(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this._spinner.hide();
          this.mensajeresp = response;
          Swal.fire(
            this.mensajeresp.titulo,
            this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
            this.mensajeresp.tipo
          );
          this.accRepParienteList();
          this.verCamposRepPariPEP = false;
        }
      });
  }
  async botonEditarRepPariente(iID) {
    this.IdRepPariPEP = iID;
    this._feicIndService.parientePep_uno(iID).subscribe((resRepPariPep) => {
      if (resRepPariPep) {
        this.IdDocumentoRepPariPEP = resRepPariPep;

        this.frmParamsRepPariPEP.controls['_id'].setValue(
          this.IdDocumentoRepPariPEP._id
        );
        this.frmParamsRepPariPEP.controls['idpadre'].setValue(
          this.IdDocumentoRepPariPEP.idpadre
        );
        this.frmParamsRepPariPEP.controls['clave'].setValue(
          this.IdDocumentoRepPariPEP.clave
        );
        this.frmParamsRepPariPEP.controls['parentesco'].setValue(
          this.IdDocumentoRepPariPEP.parentesco
        );
        this.frmParamsRepPariPEP.controls['otroParentesco'].setValue(
          this.IdDocumentoRepPariPEP.otroParentesco
        );
        this.frmParamsRepPariPEP
          .get(['complementoPAPEP'])
          .setValue(this.IdDocumentoRepPariPEP.complementoPAPEP);
        this.verCamposRepPariPEP = true;
      }
    });
  }
  async botonOcultarRepPariente() {
    this.verCamposRepPariPEP = false;
  }
  async botonGuardarRepPariente() {
    this._feicIndService
      .parientePep_actualizar(this.IdRepPariPEP, this.frmParamsRepPariPEP.value)
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposRepPariPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarRepPariente() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.IdRepPariPEP
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.parientePep_borrar(this.IdRepPariPEP).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accRepParienteList();
              this.verCamposRepPariPEP = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  // REPRESENTANTE Asociado PEP
  async accRepAsociadoList() {
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'representanteAsociadoPep';
    this._feicIndService
      .asociadoPep_list(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this.DocumentosRepAsoPEP = response;
        }
      });
  }
  async botonNuevoRepAsociado() {
    this._spinner.show();
    this.feicNuevo.idpadre = this.ID_DocumentoRepresentante;
    this.feicNuevo.clave = 'representanteAsociadoPep';

    this._feicIndService
      .asociadoPep_nuevo(this.feicNuevo)
      .subscribe((response) => {
        if (response) {
          this._spinner.hide();
          this.mensajeresp = response;
          Swal.fire(
            this.mensajeresp.titulo,
            this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
            this.mensajeresp.tipo
          );
          this.accRepAsociadoList();
          this.verCamposRepAsoPEP = false;
        }
      });
  }
  async botonEditarRepAsociado(iID) {
    this.IdRepAsoPEP = iID;
    this._feicIndService.asociadoPep_uno(iID).subscribe((response) => {
      if (response) {
        this.IdDocumentoRepAsoPEP = response;
        this.frmParamsRepAsoPEP.controls['_id'].setValue(
          this.IdDocumentoRepAsoPEP._id
        );
        this.frmParamsRepAsoPEP.controls['idpadre'].setValue(
          this.IdDocumentoRepAsoPEP.idpadre
        );
        this.frmParamsRepAsoPEP.controls['clave'].setValue(
          this.IdDocumentoRepAsoPEP.clave
        );

        this.frmParamsRepAsoPEP.controls['motivoAsociacion'].setValue(
          this.IdDocumentoRepAsoPEP.motivoAsociacion
        );
        this.frmParamsRepAsoPEP.controls['otroMotivoAsociacion'].setValue(
          this.IdDocumentoRepAsoPEP.otroMotivoAsociacion
        );
        this.frmParamsRepAsoPEP.controls['complementoPAPEP'].setValue(
          this.IdDocumentoRepAsoPEP.complementoPAPEP
        );
        this.verCamposRepAsoPEP = true;
      }
    });
  }
  async botonOcultarRepAsociado() {
    this.verCamposRepAsoPEP = false;
  }
  async botonGuardarRepAsociado() {
    this._feicIndService
      .asociadoPep_actualizar(this.IdRepAsoPEP, this.frmParamsRepAsoPEP.value)
      .subscribe(
        (response) => {
          if (response) {
            this._spinner.hide();
            this.mensajeresp = response;
            this.procesando = false;
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
            this.verCamposRepAsoPEP = false;
          }
        },
        (error) => {
          this._spinner.hide();
          this.procesando = false;
          this.mensajeresp = <any>error.error;
          if (this.mensajeresp != null) {
            Swal.fire(
              this.mensajeresp.titulo,
              this.mensajeresp.mensaje + ' ' + this.mensajeresp.ref,
              this.mensajeresp.tipo
            );
          } else {
            this.mensajeout = Valfuctions.mkValEspecifico(
              4018,
              this.identity.idioma,
              ''
            );
            Swal.fire(
              this.mensajeout.titulo,
              this.mensajeout.mensaje + ' ' + this.mensajeout.ref,
              this.mensajeout.tipo
            );
          }
        }
      );
  }
  async botonEliminarRepAsociado() {
    this.mensajeout = await Valfuctions.mkValEspecifico(
      3001,
      'es',
      this.IdRepAsoPEP
    );
    Swal.fire({
      title: this.mensajeout.titulo,
      text: this.mensajeout.mensaje,
      icon: this.mensajeout.tipo,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        this._feicIndService.asociadoPep_borrar(this.IdRepAsoPEP).subscribe(
          (response) => {
            if (response) {
              this.mensajeout = response;
              Swal.fire(
                this.mensajeout.titulo,
                this.mensajeout.mensaje + '...' + this.mensajeout.ref,
                this.mensajeout.tipo
              );
              this.accRepAsociadoList();
              this.verCamposRepAsoPEP = false;
            }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              var mkerrores = JSON.parse(error._body);
              Swal.fire(this.devempresa, mkerrores.message, 'error');
            }
          }
        );
      } else {
        // Dijeron que no
        console.log('*NO se elimina el registro*');
      }
    });
  }

  ctrFormParams() {
    (this.frmParams = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      mkid: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],
      estatus: [{ value: '' }, Validators.required],
      empresa: [{ value: '' }, Validators.required],
      sucursal: [{ value: '' }, Validators.required],
      usuario: [{ value: '' }, Validators.required],
      fechaEmision: [{ value: '' }, Validators.required],
      horaEmision: [{ value: '' }, Validators.required],
      fechaRegistro: [{ value: '' }, Validators.required],
      horaRegistro: [{ value: '' }, Validators.required],

      idioma: [{ value: '' }, Validators.required],
      suscripcion: [{ value: '' }, Validators.required],
      modulo: [{ value: '' }, Validators.required],
      documento: [{ value: '' }, Validators.required],
      accion: [{ value: '' }, Validators.required],
      observaciones: [{ value: '' }, Validators.required],
      referencia: [{ value: '' }, Validators.required],
      //DATOS
      tipoActuacion: [{ value: '' }, Validators.required],
      calidadActual: [{ value: '' }, Validators.required],
      fecha: [{ value: '' }, Validators.required],
      lugar: this._fb.group({
        pais: [{ value: '' }, Validators.required],
        departamento: [{ value: '' }, Validators.required],
        municipio: [{ value: '' }, Validators.required],
      }),
      cliente: this._fb.group({
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        fechaNacimiento: [{ value: '' }, Validators.required],
        nacionalidades: [],
        nacimiento: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        condicionMigratoria: [{ value: '' }, Validators.required],
        otraCondicionMigratoria: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        estadoCivil: [{ value: '' }, Validators.required],
        profesionOficio: [{ value: '' }, Validators.required],
        tipoDocumentoIdentificacion: [{ value: '' }, Validators.required],
        numeroDocumentoIdentificacion: [{ value: '' }, Validators.required],
        emisionPasaporte: [{ value: '' }, Validators.required],
        nit: [{ value: '' }, Validators.required],
        telefonos: [],
        email: [{ value: '' }, Validators.required],
        direccionResidencia: [{ value: '' }, Validators.required],
        residencia: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        pep: [{ value: '' }, Validators.required],
        datosPep: this._fb.group({
          entidad: [{ value: '' }, Validators.required],
          puestoDesempenia: [{ value: '' }, Validators.required],
          paisEntidad: [{ value: '' }, Validators.required],
          origenRiqueza: [{ value: '' }, Validators.required],
          otroOrigenRiqueza: [{ value: '' }, Validators.required],
        }),
        parienteAsociadoPep: [{ value: '' }, Validators.required],
        datosParienteAsociadoPep: this._fb.array([
          this._fb.group({
            parentesco: [{ value: '' }, Validators.required],
            otroParentesco: [{ value: '' }, Validators.required],
            motivoAsociacion: [{ value: '' }, Validators.required],
            otroMotivoAsociacion: [{ value: '' }, Validators.required],
            primerApellido: [{ value: '' }, Validators.required],
            segundoApellido: [{ value: '' }, Validators.required],
            apellidoCasada: [{ value: '' }, Validators.required],
            primerNombre: [{ value: '' }, Validators.required],
            segundoNombre: [{ value: '' }, Validators.required],
            otrosNombres: [{ value: '' }, Validators.required],
            sexo: [{ value: '' }, Validators.required],
            condicion: [{ value: '' }, Validators.required],
            entidad: [{ value: '' }, Validators.required],
            puestoDesempenia: [{ value: '' }, Validators.required],
            paisEntidad: [{ value: '' }, Validators.required],
          }),
        ]),
        cpe: [{ value: '' }, Validators.required],
      }),
      representante: this._fb.group({
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        fechaNacimiento: [{ value: '' }, Validators.required],
        nacionalidades: [],
        nacimiento: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        condicionMigratoria: [{ value: '' }, Validators.required],
        otraCondicionMigratoria: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        estadoCivil: [{ value: '' }, Validators.required],
        profesionOficio: [{ value: '' }, Validators.required],
        tipoDocumentoIdentificacion: [{ value: '' }, Validators.required],
        numeroDocumentoIdentificacion: [{ value: '' }, Validators.required],
        emisionPasaporte: [{ value: '' }, Validators.required],
        nit: [{ value: '' }, Validators.required],
        telefonos: [],
        email: [{ value: '' }, Validators.required],
        direccionResidencia: [{ value: '' }, Validators.required],
        residencia: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        pep: [{ value: '' }, Validators.required],
        datosPep: this._fb.group({
          entidad: [{ value: '' }, Validators.required],
          puestoDesempenia: [{ value: '' }, Validators.required],
          paisEntidad: [{ value: '' }, Validators.required],
          origenRiqueza: [{ value: '' }, Validators.required],
          otroOrigenRiqueza: [{ value: '' }, Validators.required],
        }),
        parienteAsociadoPep: [{ value: '' }, Validators.required],
        datosParienteAsociadoPep: this._fb.array([
          this._fb.group({
            parentesco: [{ value: '' }, Validators.required],
            otroParentesco: [{ value: '' }, Validators.required],
            motivoAsociacion: [{ value: '' }, Validators.required],
            otroMotivoAsociacion: [{ value: '' }, Validators.required],
            primerApellido: [{ value: '' }, Validators.required],
            segundoApellido: [{ value: '' }, Validators.required],
            apellidoCasada: [{ value: '' }, Validators.required],
            primerNombre: [{ value: '' }, Validators.required],
            segundoNombre: [{ value: '' }, Validators.required],
            otrosNombres: [{ value: '' }, Validators.required],
            sexo: [{ value: '' }, Validators.required],
            condicion: [{ value: '' }, Validators.required],
            entidad: [{ value: '' }, Validators.required],
            puestoDesempenia: [{ value: '' }, Validators.required],
            paisEntidad: [{ value: '' }, Validators.required],
          }),
        ]),
        cpe: [{ value: '' }, Validators.required],
      }),
      infoEconomica: this._fb.group({
        montoIngresos: [{ value: '' }, Validators.required],
        negocioPropio: this._fb.array([
          this._fb.group({
            nombreComercial: [{ value: '' }, Validators.required],
          }),
        ]),
        relacionDependencia: this._fb.array([
          this._fb.group({
            nombreEmpleador: [{ value: '' }, Validators.required],
          }),
        ]),
        otrosIngresos: this._fb.array([
          this._fb.group({
            otrasFuentesIngreso: [{ value: '' }, Validators.required],
          }),
        ]),
        propositoRC: [{ value: '' }, Validators.required],
      }),
    })),
      this.frmParams.reset();
    this.frmParams.controls['empresa'].setValue('FINANCIERA SUMMA, S.A.');
    this.frmParams.controls['estatus'].setValue('BORRADOR');
    this.frmParams.controls['sucursal'].setValue(this.identity.Sucursal);
    this.frmParams.controls['usuario'].setValue(this.identity.Usuario);
    this.frmParams.controls['fechaEmision'].setValue(
      moment(this.hoy).format('YYYY-MM-DD')
    );
    this.frmParams.controls['idioma'].setValue('es');
    this.frmParams.controls['suscripcion'].setValue(this.identity.Suscripcion);
    this.frmParams.controls['modulo'].setValue('INDIVIDUAL');
    this.frmParams.controls['documento'].setValue('PERSONA INDIVIDUAL');
    this.frmParams.controls['observaciones'].setValue('');
  }
  ctrFormParamsTit() {
    this.frmParamsTit = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      mkid: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],
      titular_id: [{ value: '' }, Validators.required],
      tipoActuacion: [{ value: '' }, Validators.required],
      calidadActual: [{ value: '' }],
      fecha: [{ value: '' }, Validators.required],
      lugar: this._fb.group({
        pais: [{ value: '' }, Validators.required],
        departamento: [{ value: '' }, Validators.required],
        municipio: [{ value: '' }, Validators.required],
      }),
      cliente: this._fb.group({
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        fechaNacimiento: [{ value: '' }, Validators.required],
        nacionalidades: [],
        nacimiento: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        condicionMigratoria: [{ value: '' }, Validators.required],
        otraCondicionMigratoria: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        estadoCivil: [{ value: '' }, Validators.required],
        profesionOficio: [{ value: '' }, Validators.required],
        tipoDocumentoIdentificacion: [{ value: '' }, Validators.required],
        numeroDocumentoIdentificacion: [{ value: '' }, Validators.required],
        emisionPasaporte: [{ value: '' }, Validators.required],
        nit: [{ value: '' }, Validators.required],
        telefonos: [],
        zona: [{ value: '' }, Validators.required],
        email: [{ value: '' }, Validators.required],
        direccionResidencia: [{ value: '' }, Validators.required],
        residencia: this._fb.group({
          pais: [{ value: '' }, Validators.required],
          departamento: [{ value: '' }, Validators.required],
          municipio: [{ value: '' }, Validators.required],
        }),
        pep: [{ value: '' }, Validators.required],
        parientePep: [{ value: '' }, Validators.required],
        asociadoPep: [{ value: '' }, Validators.required],
        cpe: [{ value: '' }, Validators.required],
      }),
    });

    this.frmParamsTit.reset();
  }
  ctrFormParamsTitPEP() {
    this.frmParamsTitPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],

      entidad: [{ value: '' }, Validators.required],
      puestoDesempenia: [{ value: '' }, Validators.required],
      paisEntidad: [{ value: '' }, Validators.required],
      origenRiqueza: [{ value: '' }, Validators.required],
      otroOrigenRiqueza: [{ value: '' }, Validators.required],
    });
    this.frmParamsTitPEP.reset();
  }
  ctrFormParamsTitPariPEP() {
    this.frmParamsTitPariPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],

      clave: [{ value: '' }, Validators.required],
      parentesco: [{ value: '' }, Validators.required],
      otroParentesco: [{ value: '' }, Validators.required],
      complementoPAPEP: this._fb.group({
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        condicion: [{ value: '' }, Validators.required],
        entidad: [{ value: '' }, Validators.required],
        puestoDesempenia: [{ value: '' }, Validators.required],
        paisEntidad: [{ value: '' }, Validators.required],
      }),
    });
    this.frmParamsTitPariPEP.reset();
  }
  ctrFormParamsTitAsoPEP() {
    this.frmParamsTitAsoPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],

      clave: [{ value: '' }, Validators.required],

      motivoAsociacion: [{ value: '' }, Validators.required],
      otroMotivoAsociacion: [{ value: '' }, Validators.required],
      complementoPAPEP: this._fb.group({
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        condicion: [{ value: '' }, Validators.required],
        entidad: [{ value: '' }, Validators.required],
        puestoDesempenia: [{ value: '' }, Validators.required],
        paisEntidad: [{ value: '' }, Validators.required],
      }),
    });
    this.frmParamsTitAsoPEP.reset();
  }
  ctrFormParamsInfoEco() {
    this.frmParamsInfoEco = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      mkid: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],
      fecha: { type: String, required: true },
      actividadEconomica: { type: String, required: true },
      montoIngresos: this._fb.array([
        this._fb.group({
          moneda: [{ value: '' }, Validators.required],
          monto: [{ value: '' }, Validators.required],
        }),
      ]),
      negocioPropio: this._fb.array([
        this._fb.group({
          nombreComercial: [{ value: '' }, Validators.required],
        }),
      ]),
      relacionDependencia: this._fb.array([
        this._fb.group({
          nombreEmpleador: [{ value: '' }, Validators.required],
        }),
      ]),
      fuenteIngreso: [],
      otrosIngresos: this._fb.array([
        this._fb.group({
          otrasFuentesIngreso: [{ value: '' }, Validators.required],
        }),
      ]),
      montoEgresos: this._fb.array([
        this._fb.group({
          moneda: [{ value: '' }, Validators.required],
          monto: [{ value: '' }, Validators.required],
        }),
      ]),
      propositoRC: [{ value: '' }, Validators.required],
    });
    this.frmParamsInfoEco.reset();
  }
  ctrFormParamsInfoRep() {
    this.frmParamsRepresentante = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      mkid: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],
      primerApellido: [{ value: '' }, Validators.required],
      segundoApellido: [{ value: '' }, Validators.required],
      apellidoCasada: [{ value: '' }, Validators.required],
      primerNombre: [{ value: '' }, Validators.required],
      segundoNombre: [{ value: '' }, Validators.required],
      otrosNombres: [{ value: '' }, Validators.required],
      fechaNacimiento: [{ value: '' }, Validators.required],
      nacionalidades: [],
      nacimiento: this._fb.group({
        pais: [{ value: '' }, Validators.required],
        departamento: [{ value: '' }, Validators.required],
        municipio: [{ value: '' }, Validators.required],
      }),
      condicionMigratoria: [{ value: '' }, Validators.required],
      otraCondicionMigratoria: [{ value: '' }, Validators.required],
      sexo: [{ value: '' }, Validators.required],
      estadoCivil: [{ value: '' }, Validators.required],
      profesionOficio: [{ value: '' }, Validators.required],
      tipoDocumentoIdentificacion: [{ value: '' }, Validators.required],
      numeroDocumentoIdentificacion: [{ value: '' }, Validators.required],
      emisionPasaporte: [{ value: '' }, Validators.required],
      nit: [{ value: '' }, Validators.required],
      telefonos: [],
      email: [{ value: '' }, Validators.required],
      direccionResidencia: [{ value: '' }, Validators.required],
      residencia: this._fb.group({
        pais: [{ value: '' }, Validators.required],
        departamento: [{ value: '' }, Validators.required],
        municipio: [{ value: '' }, Validators.required],
      }),
      pep: [{ value: '' }, Validators.required],
      parientePep: [{ value: '' }, Validators.required],
      asociadoPep: [{ value: '' }, Validators.required],
      cpe: [{ value: '' }, Validators.required],
    });
    this.frmParamsRepresentante.reset();
  }
  ctrFormParamsRepPEP() {
    this.frmParamsRepPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],

      entidad: [{ value: '' }, Validators.required],
      puestoDesempenia: [{ value: '' }, Validators.required],
      paisEntidad: [{ value: '' }, Validators.required],
      origenRiqueza: [{ value: '' }, Validators.required],
      otroOrigenRiqueza: [{ value: '' }, Validators.required],
    });
    this.frmParamsRepPEP.reset();
  }
  ctrFormParamsRepPariPEP() {
    this.frmParamsRepPariPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],

      parentesco: [{ value: '' }, Validators.required],
      otroParentesco: [{ value: '' }, Validators.required],
      complementoPAPEP: this._fb.group({
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        condicion: [{ value: '' }, Validators.required],
        entidad: [{ value: '' }, Validators.required],
        puestoDesempenia: [{ value: '' }, Validators.required],
        paisEntidad: [{ value: '' }, Validators.required],
      }),
    });
    this.frmParamsRepPariPEP.reset();
  }
  ctrFormParamsRepAsoPEP() {
    this.frmParamsRepAsoPEP = this._fb.group({
      _id: [{ value: '' }, Validators.required],
      idpadre: [{ value: '' }, Validators.required],
      clave: [{ value: '' }, Validators.required],

      motivoAsociacion: [{ value: '' }, Validators.required],
      otroMotivoAsociacion: [{ value: '' }, Validators.required],
      complementoPAPEP: this._fb.group({
        primerNombre: [{ value: '' }, Validators.required],
        segundoNombre: [{ value: '' }, Validators.required],
        otrosNombres: [{ value: '' }, Validators.required],
        primerApellido: [{ value: '' }, Validators.required],
        segundoApellido: [{ value: '' }, Validators.required],
        apellidoCasada: [{ value: '' }, Validators.required],
        sexo: [{ value: '' }, Validators.required],
        condicion: [{ value: '' }, Validators.required],
        entidad: [{ value: '' }, Validators.required],
        puestoDesempenia: [{ value: '' }, Validators.required],
        paisEntidad: [{ value: '' }, Validators.required],
      }),
    });
    this.frmParamsRepAsoPEP.reset();
  }
}
