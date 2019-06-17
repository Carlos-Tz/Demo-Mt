import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ft08incie1',
  templateUrl: './ft08incie1.component.html',
  styleUrls: ['./ft08incie1.component.css']
})
export class Ft08incie1Component implements OnInit {
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
    anio: '',
    mes: '',
    dia: ''
  };
  public ft081 = {
    p: '',
    me: '',
    in: '',
    pr: '',
    n1: '',
    n2: '',
    n3: '',
    n4: '',
    n5: '',
    n6: '',
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
        this.client = data;
        if (data.ft08i1) {
          this.ft081 = data.ft08i1;
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
      p: [''],
      me: [''],
      in: [''],
      pr: [''],
      n1: [''],
      n2: [''],
      n3: [''],
      n4: [''],
      n5: [''],
      n6: [''],
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
      fs6: ['']
    });
  }

  submitClientData = () => {
    this.clientApi.UpdateFt08INCIE1(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }
}
