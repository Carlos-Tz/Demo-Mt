import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ft01',
  templateUrl: './ft01.component.html',
  styleUrls: ['./ft01.component.css']
})
export class Ft01Component implements OnInit {
  public client: {
    razon: '',
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
    costo: '',
    costol: '',
    dia: '',
    mes: '',
    anio: '',
    s1: '',
    s2: ''
  };
  /* public client: Client = null; */

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
        /* if (this.client) {
          console.log('ok', this.client);
        } else {
          console.log('Sin expediente');
        } */
      });
    }
  }

  goBack = () => {
    this.location.back();
  }
}
