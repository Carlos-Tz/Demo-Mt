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
  costol = '';
  public clientForm: FormGroup;
  // public dataList = [];
  public key = '';
  public datos = {
    razon: '',
    giro: '',
    nocontrol: '',
    nombre: '',
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
    cargouv: ''
  };
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
   // private ng2ImgMax: Ng2ImgMaxService,
    private actRouter: ActivatedRoute,
    public fb: FormBuilder,
    public sanitizer: DomSanitizer,
   // private router: Router,
    private location: Location,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    /* if (this.offlineOnlineService.isOnline) { */
      this.key = this.actRouter.snapshot.paramMap.get('key');
      this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
        this.datos = data.datos;
      });
    /* } */
    this.cForm();
  }

  cForm() {
    this.clientForm = this.fb.group({
      razon: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      nocontrol: [''],
      nombre: ['', [Validators.required]],
      fechai: ['', [Validators.required]],
      tel: [''],
      correo: [''],
      id: [''],
      folio: [''],
      fax: [''],
      pedido: [''],
      rfc: [''],
      calle: [''],
      colonia: [''],
      munic: [''],
      estado: [''],
      cp: [''],
      tipos: [''],
      tension: [''],
      planos: [''],
      cargai: [''],
      alcance: [''],
      factor: [''],
      cargadem: [''],
      corriente: [''],
      volts: [''],
      sub: [''],
      area: [''],
      costo: [''],
      costol: [''],
      instal: [''],
      nom1: [''],
      nom7: [''],
      nom13: [''],
      revp: [''],
      verfs: [''],
      verfbt: [''],
      ambien: [''],
      memo: [''],
      nombreuv: [''],
      iduv: [''],
      foliouv: [''],
      fft02: [''],
      fft03: [''],
      fft05: [''],
      fft06: [''],
      fft09: [''],
      fft10: [''],
      fft11: [''],
      ffc07: [''],
      mesl: [''],
      s1: [''],
      s2: [''],
      s3: [''],
      logo: ['']
    });
  }

  ResetForm() {
    this.clientForm.reset();
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
