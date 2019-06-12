import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fc07',
  templateUrl: './fc07.component.html',
  styleUrls: ['./fc07.component.css']
})
export class Fc07Component implements OnInit {
  public client: {
    razon: '',
    giro: '',
    nombre: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    tel: '',
    fax: '',
    correo: '',
    memo: '',
    nocontrol: '',
    tension: '',
    cargai: '',
    sub: '',
    instal: '',
    planos: '',
    dia: '',
    mes: '',
    anio: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
      });
    }
  }

  goBack = () => {
    this.location.back();
  }
}
