import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport: any;

@Component({
  selector: 'app-ft03',
  templateUrl: './ft03.component.html',
  styleUrls: ['./ft03.component.css']
})
export class Ft03Component implements OnInit {
  public client = {
    razon: '',
    nocontrol: '',
    tension: '',
    nombre: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    nom1: '',
    nom7: '',
    nom13: '',
    revp: '',
    verfs: '',
    verfbt: '',
    costo: 0,
    costol: '',
    anio: '',
    fechai: '',
    nombreuv: '',
    fft03: '',
    cent: 0
  };
  public key = '';
  public mes = '';
  public cents = '';
  public cost = '';
  public ff = {
    d: '',
    m: '',
    a: ''
  };
  public ft03 = {
    nom1: false,
    nom7: false,
    nom13: false,
    revp: false,
    vers: false,
    veri: false,
    s1: '',
    s2: ''
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
          if (this.client.fechai) {
            this.ff = this.clientApi.splitDate(this.client.fechai);
            this.mes = this.monthToName(this.ff.m);
          }
          if (data.ft03) {
            this.ft03 = data.ft03;
          } else {
            this.ft03.nom1 = false;
            this.ft03.nom7 = false;
            this.ft03.nom13 = false;
            this.ft03.revp = false;
            this.ft03.vers = false;
            this.ft03.veri = false;
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
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
        if (this.client.fechai) {
          this.ff = this.clientApi.splitDate(this.client.fechai);
          this.mes = this.monthToName(this.ff.m);
        }
        if (client.ft03) {
          this.ft03 = client.ft03;
        } else {
          this.ft03.nom1 = false;
          this.ft03.nom7 = false;
          this.ft03.nom13 = false;
          this.ft03.revp = false;
          this.ft03.vers = false;
          this.ft03.veri = false;
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
    this.clientApi.UpdateFt03(this.ft03, this.key);
    this.toastr.success('Actualizado!');
  }

  imgChanged($event) {
    this.ft03.s1 = $event.target.src;
  }
  imgChanged2($event) {
    this.ft03.s2 = $event.target.src;
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
  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'ft-03', false);
  }
}
