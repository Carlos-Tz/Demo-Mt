import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ft03',
  templateUrl: './ft03.component.html',
  styleUrls: ['./ft03.component.css']
})
export class Ft03Component implements OnInit {
  public client: {
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
    costo: '',
    costol: '',
    anio: '',
    fechai: '',
    nombreuv: '',
    fft03: ''
  };
  public key = '';
  public mes = '';
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
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
        if (this.client.fft03) {
          this.ff = this.clientApi.splitDate(this.client.fft03);
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
}
