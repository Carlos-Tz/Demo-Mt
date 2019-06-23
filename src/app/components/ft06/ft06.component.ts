import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ft06',
  templateUrl: './ft06.component.html',
  styleUrls: ['./ft06.component.css']
})
export class Ft06Component implements OnInit {
  public clientF: FormGroup;
  public key = '';
  public client: {
    razon: '',
    nocontrol: '',
    tension: '',
    cargai: '',
    dia: '',
    mes: '',
    anio: ''
  };
  public ft06 = {
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
    o26: '',
    o27: '',
    o28: '',
    o29: '',
    o30: '',
    os1: '',
    os2: '',
    os3: '',
    os4: '',
    os5: '',
    os6: '',
    os7: '',
    os8: '',
    os9: '',
    os10: '',
    os11: '',
    os12: '',
    os13: '',
    os14: '',
    os15: '',
    os16: '',
    os17: '',
    os18: '',
    os19: '',
    os20: '',
    os21: '',
    os22: '',
    os23: '',
    os24: '',
    os25: '',
    os26: '',
    os27: '',
    os28: '',
    os29: '',
    os30: '',
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
    c27: '',
    c28: '',
    c29: '',
    c30: ''
  };

  constructor(
    private toastr: ToastrService,
    private clientApi: ClientService,
    private location: Location,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
        if (data.ft06) {
          this.ft06 = data.ft06;
        }
      });
    }
    this.form();
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt06(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }

  form() {
    this.clientF = this.fb.group({
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
      o27: [''],
      o28: [''],
      o29: [''],
      o30: [''],
      os1: [''],
      os2: [''],
      os3: [''],
      os4: [''],
      os5: [''],
      os6: [''],
      os7: [''],
      os8: [''],
      os9: [''],
      os10: [''],
      os11: [''],
      os12: [''],
      os13: [''],
      os14: [''],
      os15: [''],
      os16: [''],
      os17: [''],
      os18: [''],
      os19: [''],
      os20: [''],
      os21: [''],
      os22: [''],
      os23: [''],
      os24: [''],
      os25: [''],
      os26: [''],
      os27: [''],
      os28: [''],
      os29: [''],
      os30: [''],
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
      c27: [''],
      c28: [''],
      c29: [''],
      c30: ['']
    });
  }
}
