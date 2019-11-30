import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { Datos } from 'src/app/models/datos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-ft01',
  templateUrl: './ft01.component.html',
  styleUrls: ['./ft01.component.css']
})
export class Ft01Component implements OnInit {
  public key = '';
  public month = '';
  public cents = '';
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
    intro2: '',
    area: '',
    cent: 0
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
          this.month = this.clientApi.monthToRoman(this.client.mes);
          if (!this.client.fpago) { this.client.fpago = 'Las actuales con la empresa.'; }
          if (!this.client.vigencia) { this.client.vigencia = '30 días naturales.'; }
          // tslint:disable-next-line: max-line-length
          if (!this.client.intro) { this.client.intro = '   En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en baja tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).'; }
          // tslint:disable-next-line: max-line-length
          if (!this.client.intro2) { this.client.intro2 = 'A fin de cumplir con las leyes aplicables a la materia, las instalaciones eléctricas en servicios en baja tensión y en lugares de concentración pública deben ser verificadas por una Unidad de Verificación de Instalaciones Eléctricas aprobada por la Secretaría de Energía y acreditada por la Entidad Mexicana de Acreditación'; }
          if (this.client.cent) {
            if (this.client.cent < 10) {
              this.cents = `0${this.client.cent}`;
            } else {
              this.cents = `${this.client.cent}`;
            }
          } else {
            this.cents = '00';
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
          // tslint:disable-next-line: max-line-length
          if (!this.client.intro) { this.client.intro = '   En respuesta a su amable solicitud de cotización, estoy poniendo a su consideración el presupuesto relativo a la verificación de sus instalaciones eléctricas en baja tensión; conforme a la NOM-001-SEDE-2012, Instalaciones eléctricas (utilización).'; }
          // tslint:disable-next-line: max-line-length
          if (!this.client.intro2) { this.client.intro2 = 'A fin de cumplir con las leyes aplicables a la materia, las instalaciones eléctricas en servicios en baja tensión y en lugares de concentración pública deben ser verificadas por una Unidad de Verificación de Instalaciones Eléctricas aprobada por la Secretaría de Energía y acreditada por la Entidad Mexicana de Acreditación'; }
          if (this.client.cent) {
            if (this.client.cent < 10) {
              this.cents = `0${this.client.cent}`;
            } else {
              this.cents = `${this.client.cent}`;
            }
          } else {
            this.cents = '00';
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
}
