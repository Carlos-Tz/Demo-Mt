import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { Datos } from 'src/app/models/datos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ft01',
  templateUrl: './ft01.component.html',
  styleUrls: ['./ft01.component.css']
})
export class Ft01Component implements OnInit {
  public key = '';
  public month = '';
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
    cargai: '',
    tipos: '',
    costo: '',
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
    area: ''
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
        this.month = this.clientApi.monthToRoman(this.client.mes);
        if (!this.client.fpago) { this.client.fpago = 'Las actuales con la empresa.'; }
        if (!this.client.vigencia) { this.client.vigencia = '30 días naturales.'; }
        // tslint:disable-next-line: max-line-length
        if (!this.client.intro) { this.client.intro = 'En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en baja tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).'; }
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
}
