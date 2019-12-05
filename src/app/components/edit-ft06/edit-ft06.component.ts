import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';


@Component({
  selector: 'app-edit-ft06',
  templateUrl: './edit-ft06.component.html',
  styleUrls: ['./edit-ft06.component.css']
})
export class EditFt06Component implements OnInit {
  public rowF: FormGroup;
  public newRowF: FormGroup;
  public key = '';
  public key2 = '';
  public online: boolean;
  public ft06Row = {
    id_: 0,
    nom: '',
    tex: '',
    tip: '',
    cri: '',
    obp: '',
    obs: '',
    cum: ''
  };
  public newft06Row = {
    id_: 0,
    nom: '',
    tex: '',
    tip: '',
    cri: '',
    obp: '',
    obs: '',
    cum: ''
  };

  constructor(
    private toastr: ToastrService,
    private location: Location,
    private actRouter: ActivatedRoute,
    private fb: FormBuilder,
    private clientApi: ClientService,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.key2 = this.actRouter.snapshot.paramMap.get('key2');
    this.online = this.offlineOnlineService.isOnline;
    if (this.online) {
     // this.clientApi.Getf06(this.key);
      this.clientApi.getCurrentDataF06Row(this.key, this.key2).valueChanges().subscribe(data => {
        this.ft06Row = data;
      // console.log(data);
      if (this.ft06Row) {
        this.newft06Row.id_ = this.ft06Row.id_ + 0.01;
      }
      });
    } else {
      this.clientApi.localDb.ft06
      .get(this.key2).then(async (cc) => {
        this.ft06Row = cc;
        if (this.ft06Row) {
          this.newft06Row.id_ = this.ft06Row.id_ + 0.01;
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
  }

  updRow() {
    this.clientApi.updateRowFt06(this.ft06Row, this.key2);
    this.toastr.success('Artículo actualizado!');
  }

  addNewRow() {
    this.clientApi.addRowFt06(this.newft06Row, this.key);
    this.toastr.success('Nuevo artículo agregado!');
  }

  goBack = () => {
    this.location.back();
  }

  submitClientData = () => {
    this.updRow();
    if (this.newft06Row.nom || this.newft06Row.tex || this.newft06Row.tip || this.newft06Row.cri) {
      this.addNewRow();
    }
    this.location.back();
  }

  deleteData() {
    if (window.confirm('¿Esta seguro de eliminar el artículo actual?')) {
      this.clientApi.deleteRowFt06(this.key, this.key2);
      this.location.back();
    }
  }

}
