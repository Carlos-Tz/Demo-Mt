import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ft07',
  templateUrl: './ft07.component.html',
  styleUrls: ['./ft07.component.css']
})
export class Ft07Component implements OnInit {

   public clientF: FormGroup;
  public key = '';
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
    tel: '',
    correo: '',
    anio: ''
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
    f4: ''
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
        if (data.ft11) {
          this.ft11 = data.ft11;
        }
      });
    }
    this.form();
  }

  goBack = () => {
    this.location.back();
  }

  form() {
    this.clientF = this.fb.group({
      r1: [''],
      r2: [''],
      r3: [''],
      r3a: [''],
      r4: [''],
      c1: [''],
      c2: [''],
      c3: [''],
      c4: [''],
      e1: [''],
      e2: [''],
      e3: [''],
      e4: [''],
      f1: [''],
      f2: [''],
      f3: [''],
      f4: ['']
    });
  }

  submitClientData = () => {
    this.clientApi.UpdateFt11(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }
}
