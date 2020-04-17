import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport2: any;

@Component({
  selector: 'app-ft08incie1',
  templateUrl: './ft08incie1.component.html',
  styleUrls: ['./ft08incie1.component.css']
})
export class Ft08incie1Component implements OnInit {
  public clientF: FormGroup;
  public key = '';
 // public key2 = '';
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
    cargouv: '',
    fft08ie1: '',
    fft08ie2: '',
    fft08pe1: '',
    fft08pe2: ''
  };
  /* public ft081 = {
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
  }; */

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
    // this.key2 = this.actRoute.snapshot.paramMap.get('key2');
    this.type = this.actRoute.snapshot.paramMap.get('type');
    this.form();
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.type === '8i1') {
            this.nom = true;
            if (this.client.fft08ie1) {
              this.ff = this.clientApi.splitDate(this.client.fft08ie1);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
            if (data.fti81) {
              this.clientF.patchValue(data.fti81);
            }
          }
          if (this.type === '8i2') {
            this.nom = true;
            if (this.client.fft08ie2) {
              this.ff = this.clientApi.splitDate(this.client.fft08ie2);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
            if (data.fti82) {
              this.clientF.patchValue(data.fti82);
            }
          }
          if (this.type === '8p1') {
            this.nom = false;
            if (this.client.fft08pe1) {
              this.ff = this.clientApi.splitDate(this.client.fft08pe1);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
            if (data.ftp81) {
              this.clientF.patchValue(data.ftp81);
            }
          }
          if (this.type === '8p2') {
            this.nom = false;
            if (this.client.fft08pe2) {
              this.ff = this.clientApi.splitDate(this.client.fft08pe2);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
            if (data.ftp82) {
              this.clientF.patchValue(data.ftp82);
            }
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (cc) => {
        this.client = cc.datos;
        if (this.type === '8i1') {
          this.nom = true;
          if (this.client.fft08ie1) {
            this.ff = this.clientApi.splitDate(this.client.fft08ie1);
            this.mes = this.clientApi.monthToRoman(this.ff.m);
          }
          if (cc.fti81) {
            this.clientF.patchValue(cc.fti81);
          }
        }
        if (this.type === '8i2') {
          this.nom = true;
          if (this.client.fft08ie2) {
            this.ff = this.clientApi.splitDate(this.client.fft08ie2);
            this.mes = this.clientApi.monthToRoman(this.ff.m);
          }
          if (cc.fti82) {
            this.clientF.patchValue(cc.fti82);
          }
        }
        if (this.type === '8p1') {
          this.nom = false;
          if (this.client.fft08pe1) {
            this.ff = this.clientApi.splitDate(this.client.fft08pe1);
            this.mes = this.clientApi.monthToRoman(this.ff.m);
          }
          if (cc.ftp81) {
            this.clientF.patchValue(cc.ftp81);
          }
        }
        if (this.type === '8p2') {
          this.nom = false;
          if (this.client.fft08pe2) {
            this.ff = this.clientApi.splitDate(this.client.fft08pe2);
            this.mes = this.clientApi.monthToRoman(this.ff.m);
          }
          if (cc.ftp82) {
            this.clientF.patchValue(cc.ftp82);
          }
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
      /* if (this.type === 'NOM') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.getCurrentDataF81(this.key, this.key2).valueChanges().subscribe(data => {
            this.clientF.patchValue(data);
            // this.ft081 = data;
            this.nom = true;
            if (data.fecha) {
              this.ff = this.clientApi.splitDate(data.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          });
        } else {
          this.clientApi.localDb.ft81
          .get(this.key2).then(async (cc) => {
            // this.ft081 = cc;
            this.clientF.patchValue(cc);
            this.nom = true;
            if (cc.fecha) {
              this.ff = this.clientApi.splitDate(cc.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          })
          .catch(e => {
            this.toastr.warning('Intentalo de nuevo!!');
          });
        }
      } */
      /* if (this.type === 'PEC') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.getCurrentDataF82(this.key, this.key2).valueChanges().subscribe(data => {
            this.clientF.patchValue(data);
           // this.ft081 = data;
            this.nom = false;
            if (data.fecha) {
              this.ff = this.clientApi.splitDate(data.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          });
        } else {
          this.clientApi.localDb.ft82
          .get(this.key2).then(async (cc) => {
           // this.ft081 = cc;
            this.clientF.patchValue(cc);
            this.nom = false;
            if (cc.fecha) {
              this.ff = this.clientApi.splitDate(cc.fecha);
              this.mes = this.clientApi.monthToRoman(this.ff.m);
            }
          })
          .catch(e => {
            this.toastr.warning('Intentalo de nuevo!!');
          });
        }
      } */
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt08(this.clientF.value, this.key, this.type);
    this.toastr.success('Actualizado!');
  }
  /* submitClientData = () => {
    this.clientApi.UpdateFt08INCIE1(this.clientF.value, this.key2, this.type);
    this.toastr.success('Actualizado!');
  } */

  savePDF() {
    pdfExport2(this.key, this.type, this.client.anio, this.client.nocontrol, 'ft-081', true);
  }
  /* savePDF() {
    pdfExport2(this.key, this.key2, this.type, this.client.anio, this.client.nocontrol, 'ft-081', true);
  } */

  form() {
    this.clientF = this.fb.group({
      tipo: [''],
      desc: [''],
      fecha: [''],
      id_: [null],
      n1: [null],
      n2: [null],
      n3: [null],
      n4: [null],
      n5: [null],
      n6: [null],
      d1: [''],
      d2: [''],
      d3: [''],
      d4: [''],
      d5: [''],
      d6: [''],
      nc1: [''],
      nc2: [''],
      nc3: [''],
      nc4: [''],
      nc5: [''],
      nc6: [''],
      fr1: [''],
      fr2: [''],
      fr3: [''],
      fr4: [''],
      fr5: [''],
      fr6: [''],
      a1: [''],
      a2: [''],
      a3: [''],
      a4: [''],
      a5: [''],
      a6: [''],
      fs1: [''],
      fs2: [''],
      fs3: [''],
      fs4: [''],
      fs5: [''],
      fs6: [''],
      filas: [1]
    });
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
