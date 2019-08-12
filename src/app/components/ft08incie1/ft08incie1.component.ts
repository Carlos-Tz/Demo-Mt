import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-ft08incie1',
  templateUrl: './ft08incie1.component.html',
  styleUrls: ['./ft08incie1.component.css']
})
export class Ft08incie1Component implements OnInit {
  public key = '';
  public key2 = '';
  public type = '';
  public mes = '';
  public nom = false;
  public ff = {
    d: '',
    m: '',
    a: ''
  };
  public client: {
    razon: '',
    nocontrol: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    anio: '',
    mes: '',
    dia: '',
    nombreuv: '',
    cargouv: ''
  };
  public ft081 = {
    tipo: '',
    desc: '',
    fecha: '',
    id_: null,
    n1: null,
    n2: null,
    n3: null,
    n4: null,
    n5: null,
    n6: null,
    d1: '',
    d2: '',
    d3: '',
    d4: '',
    d5: '',
    d6: '',
    nc1: '',
    nc2: '',
    nc3: '',
    nc4: '',
    nc5: '',
    nc6: '',
    fr1: '',
    fr2: '',
    fr3: '',
    fr4: '',
    fr5: '',
    fr6: '',
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    a6: '',
    fs1: '',
    fs2: '',
    fs3: '',
    fs4: '',
    fs5: '',
    fs6: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    this.key2 = this.actRoute.snapshot.paramMap.get('key2');
    this.type = this.actRoute.snapshot.paramMap.get('type');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (cc) => {
        this.client = cc.datos;
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
      if (this.type === 'NOM') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.getCurrentDataF81(this.key, this.key2).valueChanges().subscribe(data => {
            this.ft081 = data;
            this.nom = true;
            if (this.ft081.fecha) {
              this.ff = this.clientApi.splitDate(this.ft081.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          });
        } else {
          this.clientApi.localDb.ft81
          .get(this.key2).then(async (cc) => {
            this.ft081 = cc;
            this.nom = true;
            if (this.ft081.fecha) {
              this.ff = this.clientApi.splitDate(this.ft081.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          })
          .catch(e => {
            this.toastr.warning('Intentalo de nuevo!!');
          });
        }
      }
      if (this.type === 'PEC') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.getCurrentDataF82(this.key, this.key2).valueChanges().subscribe(data => {
            this.ft081 = data;
            this.nom = false;
            if (this.ft081.fecha) {
              this.ff = this.clientApi.splitDate(this.ft081.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          });
        } else {
          this.clientApi.localDb.ft82
          .get(this.key2).then(async (cc) => {
            this.ft081 = cc;
            this.nom = false;
            if (this.ft081.fecha) {
              this.ff = this.clientApi.splitDate(this.ft081.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          })
          .catch(e => {
            this.toastr.warning('Intentalo de nuevo!!');
          });
        }
      }
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt08INCIE1(this.ft081, this.key2, this.type);
    this.toastr.success('Actualizado!');
  }
}
