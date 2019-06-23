import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-ft10',
  templateUrl: './edit-ft10.component.html',
  styleUrls: ['./edit-ft10.component.css']
})
export class EditFt10Component implements OnInit {
  public rowF: FormGroup;
  public newRowF: FormGroup;
  public key = '';
  public key2 = '';
  public ft10Row = {
    id: 0,
    nom: '',
    tex: '',
    tip: '',
    cri: '',
    obp: '',
    obs: '',
    cum: ''
  };
  public newft10Row = {
    id: 0,
    nom: '',
    tex: '',
    tip: '',
    cri: '',
    obp: '',
    obs: '',
    cum: ''
  };
  //public newid = 0;
  constructor(
    private toastr: ToastrService,
    private location: Location,
    private actRouter: ActivatedRoute,
    private fb: FormBuilder,
    private clientApi: ClientService
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.key2 = this.actRouter.snapshot.paramMap.get('key2');
    this.clientApi.Getf10(this.key);
    this.clientApi.getCurrentDataF10Row(this.key, this.key2).valueChanges().subscribe(data => {
      this.ft10Row = data;
     // console.log(data);
      this.newft10Row.id = this.ft10Row.id + 0.01;
    });
  }

  updRow() {
    this.clientApi.updateRowFt10(this.ft10Row);
    this.toastr.success('Artículo actualizado!');
  }

  addNewRow() {
    this.clientApi.addRowFt10(this.newft10Row);
    this.toastr.success('Nuevo artículo agregado!');
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.updRow();
    if (this.newft10Row.nom || this.newft10Row.tex || this.newft10Row.tip || this.newft10Row.cri) {
      this.addNewRow();
    }
    this.location.back();
  }

}