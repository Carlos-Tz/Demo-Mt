import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
// import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import * as num from 'written-number';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-cotizacion',
  templateUrl: './edit-cotizacion.component.html',
  styleUrls: ['./edit-cotizacion.component.css']
})
export class EditCotizacionComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
  /*
  costol = '';
  public clientForm: FormGroup;
  public key = '';
  public datos = {
    razon: '',
    giro: '',
    nocontrol: '',
    nombre: '',
    nomcom: '',
    tel: '',
    correo: '',
    id: '',
    folio: '',
    fax: '',
    pedido: null,
    rfc: '',
    calle: '',
    colonia: '',
    munic: '',
    estado: '',
    cp: null,
    tipos: '',
    tension: null,
    planos: '',
    cargai: null,
    alcance: null,
    factor: null,
    cargadem: null,
    corriente: null,
    volts: '',
    sub: null,
    area: null,
    costo: null,
    costol: '',
    cent: null,
    instal: '',
    nom1: false,
    nom7: false,
    nom13: false,
    revp: false,
    verfs: false,
    verfbt: false,
    ambien: '',
    memo: '',
    nombreuv: '',
    nombrers: '',
    iduv: '',
    foliouv: '',
    logo: '',
    dia: '',
    mes: '',
    mesl: '',
    anio: '',
    s1: '',
    s2: '',
    s3: '',
    fechai: '',
    date: null,
    fechaf: '',
    fft02: '',
    fft03: '',
    fft05: '',
    fft06: '',
    fft09: '',
    fft10: '',
    fft11: '',
    ffc07: '',
    fpago: '',
    vigencia: '',
    intro: '',
    intro2: '',
    cargouv: ''
  };
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
    private actRouter: ActivatedRoute,
    public fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private location: Location,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
        this.datos = data.datos;
      });
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.datos = client.datos;
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
    this.cForm();
  }

  cForm() {
    this.clientForm = this.fb.group({
      razon: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechai: ['', [Validators.required]]
    });
  }


  submitClientData = () => {
    this.clientApi.updateClient(this.datos, this.key);
    this.toastr.success('Actualizado!');
  }

  costo(value) {
    this.costol =  num(value, {lang: 'es'});
    this.costol = this.costol.toString();
    this.costol = this.costol[0].toUpperCase() + this.costol.slice(1);
    this.datos.costol = this.costol;
  }

  goBack = () => {
    this.location.back();
  }
}
*/