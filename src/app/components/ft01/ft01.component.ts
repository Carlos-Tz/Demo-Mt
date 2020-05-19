import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { Datos } from 'src/app/models/datos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport: any;

@Component({
  selector: 'app-ft01',
  templateUrl: './ft01.component.html',
  styleUrls: ['./ft01.component.css']
})
export class Ft01Component implements OnInit {
  public key = '';
  public month = '';
  public cents = '';
  public cost = '';
  public client = {
    razon: '',
    nombre: '',
    giro: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    sub: '',
    csub: '',
    cargai: '',
    tipos: '',
    costo: 0,
    costol: '',
    dia: '',
    mes: '',
    anio: '',
    s1: '',
    s2: '',
    tel: '',
    correo: '',
    nombreuv: '',
    fpago: '',
    vigencia: '',
    intro: '',
    intro2: '',
    area: '',
    cent: 0,
    nocontrol: '',
    tension: '',
    fft01: '',
    dato1: '',
    dato2: '',
    dato3: '',
    dato4: '',
    dato5: '',
    dato6: '',
    dato7: '',
    dato8: '',
    dato9: '',
    dato10: '',
    dato11: '',
    dato12: ''
  };
  public mes = '';
  public ff = {
    d: '',
    m: '',
    a: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.client.fft01) {
            this.ff = this.clientApi.splitDate(this.client.fft01);
            /* this.mes = this.monthToName(this.ff.m); */
          }
          this.month = this.clientApi.monthToRoman(this.ff.m);
          if (!this.client.fpago) { this.client.fpago = 'Las actuales con la empresa.'; }
          if (!this.client.vigencia) { this.client.vigencia = '30 días naturales.'; }
          if (!this.client.intro) {
            if (this.client.tension) {
              // tslint:disable-next-line: max-line-length
              this.client.intro = `   En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en ${this.client.tension} tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).`;
            } else {
              // tslint:disable-next-line: max-line-length
              this.client.intro = '   En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).';
            }
          }
          if (!this.client.intro2) {
            if (this.client.tension) {
              // tslint:disable-next-line: max-line-length
              this.client.intro2 = `A fin de cumplir con las leyes aplicables a la materia, las instalaciones eléctricas en servicios en ${this.client.tension} tensión y en lugares de concentración pública deben ser verificadas por una Unidad de Verificación de Instalaciones Eléctricas aprobada por la Secretaría de Energía y acreditada por la Entidad Mexicana de Acreditación`;
            } else {
              // tslint:disable-next-line: max-line-length
              this.client.intro2 = 'A fin de cumplir con las leyes aplicables a la materia, las instalaciones eléctricas en servicios en tensión y en lugares de concentración pública deben ser verificadas por una Unidad de Verificación de Instalaciones Eléctricas aprobada por la Secretaría de Energía y acreditada por la Entidad Mexicana de Acreditación';
            }
          }
          if (this.client.cent) {
            if (this.client.cent < 10) {
              this.cents = `0${this.client.cent}`;
            } else {
              this.cents = `${this.client.cent}`;
            }
          } else {
            this.cents = '00';
          }
          if (this.client.costo) {
            if (this.client.costo < 1000) {
              this.cost = `${this.client.costo}`;
            } else if (this.client.costo > 999 && this.client.costo < 1000000) {
              this.cost = `${this.client.costo.toString().slice(0, -3)},${this.client.costo.toString().slice(-3)}`;
            } else if (this.client.costo > 999999 && this.client.costo < 1000000000) {
              this.cost = `${this.client.costo.toString().slice(0, -6)},${this.client.costo.toString().slice(-6, -3)},${this.client.costo.toString().slice(-3)}`;
            } else {
              this.cost = '';
            }
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        this.month = this.clientApi.monthToRoman(this.client.mes);
          if (!this.client.fpago) { this.client.fpago = 'Las actuales con la empresa.'; }
          if (!this.client.vigencia) { this.client.vigencia = '30 días naturales.'; }
          if (!this.client.intro) {
            if (this.client.tension) {
              // tslint:disable-next-line: max-line-length
              this.client.intro = `   En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en ${this.client.tension} tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).`;
            }
          }
          if (!this.client.intro2) {
            if (this.client.tension) {
              // tslint:disable-next-line: max-line-length
              this.client.intro2 = `A fin de cumplir con las leyes aplicables a la materia, las instalaciones eléctricas en servicios en ${this.client.tension} tensión y en lugares de concentración pública deben ser verificadas por una Unidad de Verificación de Instalaciones Eléctricas aprobada por la Secretaría de Energía y acreditada por la Entidad Mexicana de Acreditación`;
              }
            }
          if (this.client.cent) {
            if (this.client.cent < 10) {
              this.cents = `0${this.client.cent}`;
            } else {
              this.cents = `${this.client.cent}`;
            }
          } else {
            this.cents = '00';
          }
          if (this.client.costo) {
            if (this.client.costo < 1000) {
              this.cost = `${this.client.costo}`;
            } else if (this.client.costo > 999 && this.client.costo < 1000000) {
              this.cost = `${this.client.costo.toString().slice(0, -3)},${this.client.costo.toString().slice(-3)}`;
            } else if (this.client.costo > 999999 && this.client.costo < 1000000000) {
              this.cost = `${this.client.costo.toString().slice(0, -6)},${this.client.costo.toString().slice(-6, -3)},${this.client.costo.toString().slice(-3)}`;
            } else {
              this.cost = '';
            }
          }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt01(this.client, this.key);
    this.toastr.success('Actualizado!');
  }

  imgChanged($event) {
    this.client.s1 = $event.target.src;
  }

  imgChanged2($event) {
    this.client.s2 = $event.target.src;
  }

  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'ft-01', false);
  }
  monthToName (mes: string) {
    let m = '';
    switch (mes) {
      case '01': m = 'Enero'; break;
      case '02': m = 'Febrero'; break;
      case '03': m = 'Marzo'; break;
      case '04': m = 'Abril'; break;
      case '05': m = 'Mayo'; break;
      case '06': m = 'Junio'; break;
      case '07': m = 'Julio'; break;
      case '08': m = 'Agosto'; break;
      case '09': m = 'Septiembre'; break;
      case '10': m = 'Octubre'; break;
      case '11': m = 'Noviembre'; break;
      case '12': m = 'Diciembre'; break;
      default: m = ''; break;
    }
    return m;
  }
}
