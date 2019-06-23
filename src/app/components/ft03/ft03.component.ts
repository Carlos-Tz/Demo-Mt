import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';

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
    fechai: ''
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
