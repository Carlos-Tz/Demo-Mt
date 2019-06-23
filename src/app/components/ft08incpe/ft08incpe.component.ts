import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ft08incpe',
  templateUrl: './ft08incpe.component.html',
  styleUrls: ['./ft08incpe.component.css']
})
export class Ft08incpeComponent implements OnInit {
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
  public ft08e = {
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
    private clientApi: ClientService,
    private location: Location,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
        if (data.ft08ie) {
          this.ft08e = data.ft08ie;
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
    this.clientApi.UpdateFt08INCPE(this.clientF.value, this.key);
    this.toastr.success('Actualizado!');
  }
}
