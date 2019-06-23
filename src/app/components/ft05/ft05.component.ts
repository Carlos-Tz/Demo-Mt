import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F05 } from 'src/app/models/f05';

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
    dia: ''
  };
  public ft05 = {
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
        if (data.ft05) {
          this.ft05 = data.ft05;
        }
      });
    }
    this.form();
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
      f6: ['']
    });
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.clientApi.UpdateFt05(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }
}
