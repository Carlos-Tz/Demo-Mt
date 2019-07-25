import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
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
   // this.form();
  }

  goBack = () => {
    this.location.back();
  }

  /* form() {
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
      f4: [''],
      s1: ['']
    });
  } */

  submitClientData = () => {
    this.clientApi.UpdateFt11(this.ft11, this.key);
    this.toastr.success('Actualizado!');
  }

  imgChanged($event) {
    this.ft11.s1 = $event.target.src;
  }
}
