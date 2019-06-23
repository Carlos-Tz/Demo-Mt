import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

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
    iduv: '',
    foliouv: '',
    fechai: '',
    anio: '',
    s2: '',
    logo: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
      });
    }
  }

  goBack = () => {
    this.location.back();
  }
}
