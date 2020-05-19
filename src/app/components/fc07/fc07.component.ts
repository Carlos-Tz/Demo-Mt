import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport: any;

@Component({
  selector: 'app-fc07',
  templateUrl: './fc07.component.html',
  styleUrls: ['./fc07.component.css']
})
export class Fc07Component implements OnInit {
 // public clientF: FormGroup;
  public key = '';
  public month = '';
  public monthf = '';
  public month1 = '';
  public month01 = '';
  public month2 = '';
  public month3 = '';
  public month5 = '';
  public month6 = '';
  public month9 = '';
  public month10 = '';
  public month11 = '';
  public month12 = '';
  public month13 = '';
  public month71 = '';
  public month72 = '';
  public month151 = '';
  public month152 = '';
  public month811 = '';
  public month812 = '';
  public month821 = '';
  public month822 = '';
  public ff = { d: '', m: '', a: ''};
  public ff1 = { d: '', m: '', a: ''};
  public ff2 = { d: '', m: '', a: ''};
  public ff3 = { d: '', m: '', a: ''};
  public ff5 = { d: '', m: '', a: ''};
  public ff6 = { d: '', m: '', a: ''};
  public ff9 = { d: '', m: '', a: ''};
  public ff10 = { d: '', m: '', a: ''};
  public ff11 = { d: '', m: '', a: ''};
  public ff12 = { d: '', m: '', a: ''};
  public ff13 = { d: '', m: '', a: ''};
  public fff = { d: '', m: '', a: ''};
  public ff71 = { d: '', m: '', a: ''};
  public ff72 = { d: '', m: '', a: ''};
  public ff151 = { d: '', m: '', a: ''};
  public ff152 = { d: '', m: '', a: ''};
  public ff811 = { d: '', m: '', a: ''};
  public ff812 = { d: '', m: '', a: ''};
  public ff821 = { d: '', m: '', a: ''};
  public ff822 = { d: '', m: '', a: ''};
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
    csub: '',
    instal: '',
    planos: '',
    dia: '',
    mes: '',
    anio: '',
    pedido: '',
    ffc07: '',
    fechaf: ''
    fft01: '',
    fft02: '',
    fft03: '',
    fft05: '',
    fft06: '',
    fft09: '',
    fft10: '',
    fft11: '',
    fft12: '',
    fft13: '',
    fft08ie1: '',
    fft08ie2: '',
    fft08pe1: '',
    fft08pe2: '',
    fft151: '',
    fft152: '',
    fft071: '',
    fft072: ''
  };
  public fc07 = {
    c1: '',
    c2: '',
    c3: '',
    c4: '',
    c5: '',
    c6: '',
    c7: '',
    c8: '',
    c9: '',
    c10: '',
    c11: '',
    c12: '',
    c13: '',
    c14: '',
    c15: '',
    c16: '',
    c17: ''
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
          if (this.client.ffc07) {
            this.ff = this.clientApi.splitDate(this.client.ffc07); this.month = this.clientApi.monthToRoman(this.ff.m); }
          this.month3 = this.clientApi.monthToRoman(this.client.mes);
          if (this.client.fft02) {
            this.ff2 = this.clientApi.splitDate(this.client.fft02); this.month2 = this.clientApi.monthToRoman(this.ff2.m); }
          if (this.client.fft01) {
            this.ff1 = this.clientApi.splitDate(this.client.fft01); this.month1 = this.clientApi.monthToRoman(this.ff1.m); }
          /* if (this.client.fft03) {
            this.ff3 = this.clientApi.splitDate(this.client.fft03); this.month3 = this.clientApi.monthToRoman(this.ff3.m); } */
          if (this.client.fft05) {
            this.ff5 = this.clientApi.splitDate(this.client.fft05); this.month5 = this.clientApi.monthToRoman(this.ff5.m); }
          if (this.client.fft06) {
            this.ff6 = this.clientApi.splitDate(this.client.fft06); this.month6 = this.clientApi.monthToRoman(this.ff6.m); }
          if (this.client.fft09) {
            this.ff9 = this.clientApi.splitDate(this.client.fft09); this.month9 = this.clientApi.monthToRoman(this.ff9.m); }
          if (this.client.fft10) {
            this.ff10 = this.clientApi.splitDate(this.client.fft10); this.month10 = this.clientApi.monthToRoman(this.ff10.m); }
          if (this.client.fft11) {
            this.ff11 = this.clientApi.splitDate(this.client.fft11); this.month11 = this.clientApi.monthToRoman(this.ff11.m); }
          if (this.client.fechaf) {
            this.fff = this.clientApi.splitDate(this.client.fechaf); this.monthf = this.clientApi.monthToRoman(this.fff.m); }
          if (this.client.fft12) {
            this.ff12 = this.clientApi.splitDate(this.client.fft12); this.month12 = this.clientApi.monthToRoman(this.ff12.m); }
          if (this.client.fft13) {
            this.ff13 = this.clientApi.splitDate(this.client.fft13); this.month13 = this.clientApi.monthToRoman(this.ff13.m); }
          if (this.client.fft071) {
            this.ff71 = this.clientApi.splitDate(this.client.fft071); this.month71 = this.clientApi.monthToRoman(this.ff71.m); }
          if (this.client.fft072) {
            this.ff72 = this.clientApi.splitDate(this.client.fft072); this.month72 = this.clientApi.monthToRoman(this.ff72.m); }
          if (this.client.fft151) {
            this.ff151 = this.clientApi.splitDate(this.client.fft151); this.month151 = this.clientApi.monthToRoman(this.ff151.m); }
          if (this.client.fft152) {
            this.ff152 = this.clientApi.splitDate(this.client.fft152); this.month152 = this.clientApi.monthToRoman(this.ff152.m); }
          if (this.client.fft08ie1) {
            this.ff811 = this.clientApi.splitDate(this.client.fft08ie1); this.month811 = this.clientApi.monthToRoman(this.ff811.m); }
          if (this.client.fft08ie2) {
            this.ff812 = this.clientApi.splitDate(this.client.fft08ie2); this.month812 = this.clientApi.monthToRoman(this.ff812.m); }
          if (this.client.fft08pe1) {
            this.ff821 = this.clientApi.splitDate(this.client.fft08pe1); this.month821 = this.clientApi.monthToRoman(this.ff821.m); }
          if (this.client.fft08pe2) {
            this.ff822 = this.clientApi.splitDate(this.client.fft08pe2); this.month822 = this.clientApi.monthToRoman(this.ff822.m); }
          if (data.fc07) {
            this.fc07 = data.fc07;
          }
        });
        /* this.clientApi.Getft71(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff71 = this.clientApi.splitDate(r.fecha); this.month71 = this.clientApi.monthToRoman(this.ff71.m); }
          });
        });
        this.clientApi.Getft72(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff72 = this.clientApi.splitDate(r.fecha); this.month72 = this.clientApi.monthToRoman(this.ff72.m); }
          });
        });
        this.clientApi.Getft151(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff151 = this.clientApi.splitDate(r.fecha); this.month151 = this.clientApi.monthToRoman(this.ff151.m); }
          });
        });
        this.clientApi.Getft152(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff152 = this.clientApi.splitDate(r.fecha); this.month152 = this.clientApi.monthToRoman(this.ff152.m); }
          });
        }); */
        /* this.clientApi.Getft811(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff811 = this.clientApi.splitDate(r.fecha); this.month811 = this.clientApi.monthToRoman(this.ff811.m); }
          });
        });
        this.clientApi.Getft812(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff812 = this.clientApi.splitDate(r.fecha); this.month812 = this.clientApi.monthToRoman(this.ff812.m); }
          });
        });
        this.clientApi.Getft821(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff821 = this.clientApi.splitDate(r.fecha); this.month821 = this.clientApi.monthToRoman(this.ff821.m); }
          });
        });
        this.clientApi.Getft822(this.key).snapshotChanges().subscribe(data => {
          data.forEach(item => {
            const r: any = item.payload.toJSON();
            if (r.fecha) { this.ff822 = this.clientApi.splitDate(r.fecha); this.month822 = this.clientApi.monthToRoman(this.ff822.m); }
          });
        }); */
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        if (this.client.ffc07) {
          this.ff = this.clientApi.splitDate(this.client.ffc07); this.month = this.clientApi.monthToRoman(this.ff.m); }
        this.month3 = this.clientApi.monthToRoman(this.client.mes);
        if (this.client.fft02) {
          this.ff2 = this.clientApi.splitDate(this.client.fft02); this.month2 = this.clientApi.monthToRoman(this.ff2.m); }
        if (this.client.fft01) {
          this.ff1 = this.clientApi.splitDate(this.client.fft01); this.month1 = this.clientApi.monthToRoman(this.ff1.m); }
        if (this.client.fft05) {
          this.ff5 = this.clientApi.splitDate(this.client.fft05); this.month5 = this.clientApi.monthToRoman(this.ff5.m); }
        if (this.client.fft06) {
          this.ff6 = this.clientApi.splitDate(this.client.fft06); this.month6 = this.clientApi.monthToRoman(this.ff6.m); }
        if (this.client.fft09) {
          this.ff9 = this.clientApi.splitDate(this.client.fft09); this.month9 = this.clientApi.monthToRoman(this.ff9.m); }
        if (this.client.fft10) {
          this.ff10 = this.clientApi.splitDate(this.client.fft10); this.month10 = this.clientApi.monthToRoman(this.ff10.m); }
        if (this.client.fft11) {
          this.ff11 = this.clientApi.splitDate(this.client.fft11); this.month11 = this.clientApi.monthToRoman(this.ff11.m); }
        if (this.client.fechaf) {
          this.fff = this.clientApi.splitDate(this.client.fechaf); this.monthf = this.clientApi.monthToRoman(this.fff.m); }
        if (client.fc07) {
          this.fc07 = client.fc07;
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
    this.clientApi.UpdateFc07(this.fc07, this.key);
    this.toastr.success('Actualizado!');
  }

  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'fc-07', true);
  }

  /* form() {
    this.clientF = this.fb.group({
      c1: [''],
      c2: [''],
      c3: [''],
      c4: [''],
      c5: [''],
      c6: [''],
      c7: [''],
      c8: [''],
      c9: [''],
      c10: [''],
      c11: [''],
      c12: [''],
      c13: [''],
      c14: [''],
      c15: [''],
      c16: ['']
    });
  } */
}
