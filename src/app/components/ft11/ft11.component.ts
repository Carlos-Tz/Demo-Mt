import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-ft11',
  templateUrl: './ft11.component.html',
  styleUrls: ['./ft11.component.css']
})
export class Ft11Component implements OnInit {
  // public clientF: FormGroup;
  public key = '';
  public ff = {
    a: '',
    m: '',
    d: ''
  };
  public client: {
    razon: '',
    nocontrol: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: '',
    giro: '',
    nombreuv: '',
    nombrers: '',
    anio: '',
    fft11: ''
  };
  public ft11 = {
    r1: '',
    r2: '',
    r3: '',
    r3a: '',
    r4: '',
    c1: '',
    c2: '',
    c3: '',
    c4: '',
    e1: '',
    e2: '',
    e3: '',
    e4: '',
    f1: '',
    f2: '',
    f3: '',
    f4: '',
    s1: ''
  };

  constructor(
    private toastr: ToastrService,
    private clientApi: ClientService,
    private location: Location,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.client.fft11) {
            this.ff = this.clientApi.splitDate(this.client.fft11);
          }
          if (data.ft11) {
            this.ft11 = data.ft11;
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        if (this.client.fft11) {
          this.ff = this.clientApi.splitDate(this.client.fft11);
        }
        if (client.ft11) {
          this.ft11 = client.ft11;
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
   // this.form();
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt11(this.ft11, this.key);
    this.toastr.success('Actualizado!');
  }

  imgChanged($event) {
    this.ft11.s1 = $event.target.src;
  }

  conf1(ev: string) {
    if (ev === 'si') {
      this.ft11.r1 = 'Satisfactorio';
    }
    if (ev === 'no') {
      this.ft11.r1 = '';
    }
  }
  conf2(ev: string) {
    if (ev === 'si') {
      this.ft11.r2 = 'Satisfactorio';
    }
    if (ev === 'no') {
      this.ft11.r2 = '';
    }
  }
  conf3(ev: string) {
    if (ev === 'si') {
      this.ft11.r3 = 'Satisfactorio';
    }
    if (ev === 'no') {
      this.ft11.r3 = '';
    }
  }
  conf4(ev: string) {
    if (ev === 'si') {
      this.ft11.r4 = 'Satisfactorio';
    }
    if (ev === 'no') {
      this.ft11.r4 = '';
    }
  }
}
