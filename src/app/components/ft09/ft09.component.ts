import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
declare const pdfExport: any;

@Component({
  selector: 'app-ft09',
  templateUrl: './ft09.component.html',
  styleUrls: ['./ft09.component.css']
})
export class Ft09Component implements OnInit {
  public clientF: FormGroup;
  public key = '';
  public month = '';
  public client: {
    nocontrol: '',
    anio: '',
    mes: '',
    dia: '',
    nombreuv: '',
    fft09: '',
    cargouv: ''
  };
  public ff = {
    a: '',
    m: '',
    d: ''
  };
  /* public ft09 = {
    mt1: '',
    mt2: '',
    mt3: '',
    mt4: '',
    mt5: '',
    mt6: '',
    mt7: '',
    mt8: '',
    mt9: '',
    mt10: '',
    mt11: '',
    mt12: '',
    mt13: '',
    mt14: '',
    mt15: '',
    mt16: '',
    mt17: '',
    mt18: '',
    mt19: '',
    mt20: '',
    mt21: '',
    mt22: '',
    mt23: '',
    mt24: '',
    mt25: '',
    mt26: '',
    mc1: '',
    mc2: '',
    mc3: '',
    mc4: '',
    mc5: '',
    mc6: '',
    mc7: '',
    mc8: '',
    mc9: '',
    mc10: '',
    mc11: '',
    mc12: '',
    mc13: '',
    mc14: '',
    mc15: '',
    mc16: '',
    mc17: '',
    mc18: '',
    mc19: '',
    mc20: '',
    mc21: '',
    mc22: '',
    mc23: '',
    mc24: '',
    mc25: '',
    mc26: '',
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
    c17: '',
    c18: '',
    c19: '',
    c20: '',
    c21: '',
    c22: '',
    c23: '',
    c24: '',
    c25: '',
    c26: '',
    cu1: '',
    cu2: '',
    cu3: '',
    cu4: '',
    cu5: '',
    cu6: '',
    cu7: '',
    cu8: '',
    cu9: '',
    cu10: '',
    cu11: '',
    cu12: '',
    cu13: '',
    cu14: '',
    cu15: '',
    cu16: '',
    cu17: '',
    cu18: '',
    cu19: '',
    cu20: '',
    cu21: '',
    cu22: '',
    cu23: '',
    cu24: '',
    cu25: '',
    cu26: '',
    o1: '',
    o2: '',
    o3: '',
    o4: '',
    o5: '',
    o6: '',
    o7: '',
    o8: '',
    o9: '',
    o10: '',
    o11: '',
    o12: '',
    o13: '',
    o14: '',
    o15: '',
    o16: '',
    o17: '',
    o18: '',
    o19: '',
    o20: '',
    o21: '',
    o22: '',
    o23: '',
    o24: '',
    o25: '',
    o26: ''
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
          if (this.client.fft09) {
            this.ff = this.clientApi.splitDate(this.client.fft09);
            this.month = this.clientApi.monthToRoman(this.ff.m);
          }
          if (data.ft09) {
            // this.ft09 = data.ft09;
            this.clientF.patchValue(data.ft09);
          }
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        if (this.client.fft09) {
          this.ff = this.clientApi.splitDate(this.client.fft09);
          this.month = this.clientApi.monthToRoman(this.ff.m);
        }
        if (client.ft09) {
          this.clientF.patchValue(client.ft09);
         // this.ft09 = client.ft09;
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
    this.clientApi.UpdateFt09(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }

  form() {
    this.clientF = this.fb.group({
      mt1: [''],
    mt2: [''],
    mt3: [''],
    mt4: [''],
    mt5: [''],
    mt6: [''],
    mt7: [''],
    mt8: [''],
    mt9: [''],
    mt10: [''],
    mt11: [''],
    mt12: [''],
    mt13: [''],
    mt14: [''],
    mt15: [''],
    mt16: [''],
    mt17: [''],
    mt18: [''],
    mt19: [''],
    mt20: [''],
    mt21: [''],
    mt22: [''],
    mt23: [''],
    mt24: [''],
    mt25: [''],
    mt26: [''],
    mc1: [''],
    mc2: [''],
    mc3: [''],
    mc4: [''],
    mc5: [''],
    mc6: [''],
    mc7: [''],
    mc8: [''],
    mc9: [''],
    mc10: [''],
    mc11: [''],
    mc12: [''],
    mc13: [''],
    mc14: [''],
    mc15: [''],
    mc16: [''],
    mc17: [''],
    mc18: [''],
    mc19: [''],
    mc20: [''],
    mc21: [''],
    mc22: [''],
    mc23: [''],
    mc24: [''],
    mc25: [''],
    mc26: [''],
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
    c16: [''],
    c17: [''],
    c18: [''],
    c19: [''],
    c20: [''],
    c21: [''],
    c22: [''],
    c23: [''],
    c24: [''],
    c25: [''],
    c26: [''],
    cu1: [''],
    cu2: [''],
    cu3: [''],
    cu4: [''],
    cu5: [''],
    cu6: [''],
    cu7: [''],
    cu8: [''],
    cu9: [''],
    cu10: [''],
    cu11: [''],
    cu12: [''],
    cu13: [''],
    cu14: [''],
    cu15: [''],
    cu16: [''],
    cu17: [''],
    cu18: [''],
    cu19: [''],
    cu20: [''],
    cu21: [''],
    cu22: [''],
    cu23: [''],
    cu24: [''],
    cu25: [''],
    cu26: [''],
    o1: [''],
    o2: [''],
    o3: [''],
    o4: [''],
    o5: [''],
    o6: [''],
    o7: [''],
    o8: [''],
    o9: [''],
    o10: [''],
    o11: [''],
    o12: [''],
    o13: [''],
    o14: [''],
    o15: [''],
    o16: [''],
    o17: [''],
    o18: [''],
    o19: [''],
    o20: [''],
    o21: [''],
    o22: [''],
    o23: [''],
    o24: [''],
    o25: [''],
    o26: [''],
    filas: [1]
    });
  }
  addFila() {
    const filas: number = this.clientF.get('filas').value;
    if (filas > 0 && filas < 24) {
      this.clientF.patchValue({filas: filas + 1});
    }
  }
  deleteFila() {
    const filas: number = this.clientF.get('filas').value;
    if (filas > 1 && filas < 25) {
      this.clientF.patchValue({filas: filas - 1});
    }
  }

  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'ft-09', true);
  }
}
