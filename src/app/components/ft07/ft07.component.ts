import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport2: any;

@Component({
  selector: 'app-ft07',
  templateUrl: './ft07.component.html',
  styleUrls: ['./ft07.component.css']
})
export class Ft07Component implements OnInit {
  public key = '';
  // public key2 = '';
  public type = '';
  // public mes = '';
  public acta = false;
  public ff = {
    d: '',
    m: '',
    a: ''
  };
  public client: {
    razon: '',
    nocontrol: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    giro: '',
    nombreuv: '',
    tel: '',
    correo: '',
    anio: '',
    fft151: '',
    fft152: '',
    fft071: '',
    fft072: ''
  };
  public ft07 = {
    name: '',
    cod: '',
    rev: null,
    vigen: '',
    tipo: '',
    fecha: '',
    id_: null,
    nomycar: '',
    objeto: '',
    fechad: null,
    fecham: null,
    fechaa: null,
    horai: '',
    horaf: '',
    circuns: '',
    no_conf: '',
    observa: '',
    acciones: '',
    firma: '',
    nom1: '',
    id1: '',
    folio1: '',
    exp1: '',
    direc1: '',
    firma1: '',
    nom2: '',
    id2: '',
    folio2: '',
    exp2: '',
    direc2: '',
    firma2: '',
    nom3: '',
    id3: '',
    folio3: '',
    exp3: '',
    direc3: '',
    firma3: ''
  };

  constructor(
    private toastr: ToastrService,
    private clientApi: ClientService,
    private location: Location,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    // this.key2 = this.actRoute.snapshot.paramMap.get('key2');
    this.type = this.actRoute.snapshot.paramMap.get('type');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.type === '71') {
            if (this.client.fft071) {
              this.ff = this.clientApi.splitDate(this.client.fft071);
            }
            if (data.ft71) {
              this.ft07 = data.ft71;
            } else {
              this.initft7();
            }
          }
          if (this.type === '72') {
            if (this.client.fft072) {
              this.ff = this.clientApi.splitDate(this.client.fft072);
            }
            if (data.ft72) {
              this.ft07 = data.ft72;
            } else {
              this.initft7();
            }
          }
          if (this.type === '151') {
            if (this.client.fft151) {
              this.ff = this.clientApi.splitDate(this.client.fft151);
            }
            if (data.ft151) {
              this.ft07 = data.ft151;
            } else {
              this.initft15();
            }
          }
          if (this.type === '152') {
            if (this.client.fft152) {
              this.ff = this.clientApi.splitDate(this.client.fft152);
            }
            if (data.ft152) {
              this.ft07 = data.ft152;
            } else {
              this.initft15();
            }
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (cc) => {
        this.client = cc.datos;
        if (this.type === '71') {
          if (this.client.fft071) {
            this.ff = this.clientApi.splitDate(this.client.fft071);
          }
          if (cc.ft71) {
            this.ft07 = cc.ft71;
          } else {
            this.initft7();
          }
        }
        if (this.type === '72') {
          if (this.client.fft072) {
            this.ff = this.clientApi.splitDate(this.client.fft072);
          }
          if (cc.ft72) {
            this.ft07 = cc.ft72;
          } else {
            this.initft7();
          }
        }
        if (this.type === '151') {
          if (this.client.fft151) {
            this.ff = this.clientApi.splitDate(this.client.fft151);
          }
          if (cc.ft151) {
            this.ft07 = cc.ft151;
          } else {
            this.initft15();
          }
        }
        if (this.type === '152') {
          if (this.client.fft152) {
            this.ff = this.clientApi.splitDate(this.client.fft152);
          }
          if (cc.ft152) {
            this.ft07 = cc.ft152;
          } else {
            this.initft15();
          }
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
    /* if (this.type === 'AECIE') {
      if (this.offlineOnlineService.isOnline) {
        this.clientApi.getCurrentDataF07(this.key, this.key2).valueChanges().subscribe(data => {
          this.ft07 = data;
          this.acta = true;
          if (this.ft07.fecha) {
            this.ff = this.clientApi.splitDate(this.ft07.fecha);
          }
        });
      } else {
        this.clientApi.localDb.ft07
          .get(this.key2).then(async (cc) => {
            this.ft07 = cc;
            this.acta = true;
            if (this.ft07.fecha) {
              this.ff = this.clientApi.splitDate(this.ft07.fecha);
            }
          })
          .catch(e => {
            this.toastr.warning('Intentalo de nuevo!!');
          });
      }
    }
    if (this.type === 'RTPE') {
      if (this.offlineOnlineService.isOnline) {
        this.clientApi.getCurrentDataF15(this.key, this.key2).valueChanges().subscribe(data => {
          this.ft07 = data;
          this.acta = false;
          if (this.ft07.fecha) {
            this.ff = this.clientApi.splitDate(this.ft07.fecha);
          }
        });
      } else {
        this.clientApi.localDb.ft15
        .get(this.key2).then(async (cc) => {
          this.ft07 = cc;
          this.acta = false;
          if (this.ft07.fecha) {
            this.ff = this.clientApi.splitDate(this.ft07.fecha);
          }
        })
        .catch(e => {
          this.toastr.warning('Intentalo de nuevo!!');
        });
      }
    } */
  }

  goBack = () => {
    this.location.back();
  }

  imgChanged($event) {
    this.ft07.firma = $event.target.src;
  }
  imgChanged2($event) {
    this.ft07.firma1 = $event.target.src;
  }
  imgChanged3($event) {
    this.ft07.firma2 = $event.target.src;
  }
  imgChanged4($event) {
    this.ft07.firma3 = $event.target.src;
  }

  /* submitClientData = () => {
    this.clientApi.UpdateFt07(this.ft07, this.key2, this.type);
    this.toastr.success('Actualizado!');
  } */
  submitClientData = () => {
    this.clientApi.UpdateFt07n(this.ft07, this.key, this.type);
    this.toastr.success('Actualizado!');
  }

  savePDF() {
    pdfExport2(this.key, this.type, this.client.anio, this.client.nocontrol, 'ft-07', false);
  }
  /* savePDF() {
    pdfExport2(this.key, this.key2, this.type, this.client.anio, this.client.nocontrol, 'ft-07', false);
  } */

  initft7() {
    this.ft07.tipo = 'AECIE';
    this.ft07.name = 'ACTA DE EVALUACIÓN DE LA CONFORMIDAD';
    this.ft07.cod = 'FT-07';
    this.ft07.rev = 3;
    this.ft07.vigen = '05-Dic-14';
  }
  initft15() {
    this.ft07.tipo = 'RTPE';
    this.ft07.name = 'REPORTE TÉCNICO DE PROYECTO ELÉCTRICO';
    this.ft07.cod = 'FT-15';
    this.ft07.rev = 5;
    this.ft07.vigen = '17-Nov-17';
  }
}
