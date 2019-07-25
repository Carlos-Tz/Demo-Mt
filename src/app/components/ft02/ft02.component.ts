import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ft02',
  templateUrl: './ft02.component.html',
  styleUrls: ['./ft02.component.css']
})
export class Ft02Component implements OnInit {
  public client: {
    razon: '',
    nocontrol: '',
    tension: '',
    rfc: '',
    nombre: '',
    giro: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    sub: '',
    cargai: '',
    tipos: '',
    alcance: '',
    factor: '',
    cargadem: '',
    corriente: '',
    volts: '',
    area: '',
    instal: '',
    ambien: '',
    id: '',
    folio: '',
    nombreuv: '',
    cargouv:  '',
    iduv: '',
    foliouv: '',
    fechai: '',
    anio: '',
    fft02: '',
    s2: '',
    logo: ''
  };
  public key = '';
  public mes = '';
  public ff = {
    d: '',
    m: '',
    a: ''
  };
  public ft02 = {
    obj: '',
    alcan: '',
    anx1: '',
    anx2: '',
    anx3: '',
    anx4: '',
    anx5: '',
    anx6: '',
    snom: '',
    sid: '',
    sfol: '',
    sdom: '',
    scur: '',
    scel: '',
    scor: '',
    rid: '',
    rfol: '',
    rdom: '',
    rcur: '',
    rcel: '',
    rcor: '',
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
        if (this.client.fft02) {
          this.ff = this.clientApi.splitDate(this.client.fft02);
          this.mes = this.monthToName(this.ff.m);
        }
        if (data.ft02) {
          this.ft02 = data.ft02;
        } else {
          this.ft02.anx1 = '1. Diagrama unifilar (7.1 y/o 7.2).';
          this.ft02.anx2 = '2. Cuadro de Distribuciòn de cargas por circuito (7.2 II).';
          this.ft02.anx3 = '3. Lista de principales materiales utilizados (7.2 IV).';
          this.ft02.anx4 = '4. Lista de principales equipos utilizados (7.2 V).';
          this.ft02.anx5 = '5. Croquis de localización del domicilio (7.2 VI).';
          this.ft02.anx6 = '6. Lista de cargas (7.2 VII).';
        }
      });
    }
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt02(this.ft02, this.key);
    this.toastr.success('Actualizado!');
  }

  imgChanged2($event) {
    this.ft02.s2 = $event.target.src;
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
