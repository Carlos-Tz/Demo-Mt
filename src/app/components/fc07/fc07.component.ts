import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fc07',
  templateUrl: './fc07.component.html',
  styleUrls: ['./fc07.component.css']
})
export class Fc07Component implements OnInit {
  public clientF: FormGroup;
  public key = '';
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
    anio: '',
    pedido: ''
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
    c16: ''
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
        if (data.fc07) {
          this.fc07 = data.fc07;
        }
      });
    }
    this.form();
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFc07(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }

  form() {
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
  }
}
