import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F05 } from 'src/app/models/f05';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-ft05',
  templateUrl: './ft05.component.html',
  styleUrls: ['./ft05.component.css']
})
export class Ft05Component implements OnInit {
  public clientF: FormGroup;
  public key = '';
  public client = {
    razon: '',
    nocontrol: '',
    anio: '',
    mes: '',
    dia: '',
    fft05: ''
  };
  public ff = {
    d: '',
    m: '',
    a: ''
  };
  /* public ft05 = {
    m1: '',
    m2: '',
    m3: '',
    m4: '',
    m5: '',
    m6: '',
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    t5: '',
    t6: '',
    o1: '',
    o2: '',
    o3: '',
    o4: '',
    o5: '',
    o6: '',
    f1: '',
    f2: '',
    f3: '',
    f4: '',
    f5: '',
    f6: ''
  }; */

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
    this.form();
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.client.fft05) {
            this.ff = this.clientApi.splitDate(this.client.fft05);
          }
          if (data.ft05) {
            this.clientF.patchValue(data.ft05);
            // this.ft05 = data.ft05;
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        if (this.client.fft05) {
          this.ff = this.clientApi.splitDate(this.client.fft05);
        }
        if (client.ft05) {
          this.clientF.patchValue(client.ft05);
          // this.ft05 = client.ft05;
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
  }

  form() {
    this.clientF = this.fb.group({
      m1: [''],
      m2: [''],
      m3: [''],
      m4: [''],
      m5: [''],
      m6: [''],
      t1: [''],
      t2: [''],
      t3: [''],
      t4: [''],
      t5: [''],
      t6: [''],
      o1: [''],
      o2: [''],
      o3: [''],
      o4: [''],
      o5: [''],
      o6: [''],
      f1: [''],
      f2: [''],
      f3: [''],
      f4: [''],
      f5: [''],
      f6: [''],
      filas: [1]
    });
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt05(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }

  addFila() {
    const filas: number = this.clientF.get('filas').value;
    if (filas > 0 && filas < 6) {
      this.clientF.patchValue({filas: filas + 1});
    }
  }
  deleteFila() {
    const filas: number = this.clientF.get('filas').value;
    if (filas > 1 && filas < 7) {
      this.clientF.patchValue({filas: filas - 1});
    }
  }
}
