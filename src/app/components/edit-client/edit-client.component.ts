import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import * as num from 'written-number';
import { Location } from '@angular/common';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  costol = '';
  public key = '';
  public datos = {
    razon: '',
    giro: '',
    nocontrol: '',
    nombre: '',
    tel: '',
    correo: '',
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
    ambien: '',
    memo: '',
    nombreuv: '',
    logo: '',
    dia: '',
    mes: '',
    anio: '',
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
  uploadedImage: Blob;
  public logo = '';
  public signs = {
    s1: '',
    s2: '',
    s3: ''
  };
  public clientForm: FormGroup;
  public dataList = [];
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
    private ng2ImgMax: Ng2ImgMaxService,
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
      nocontrol: [''],
      nombre: ['', [Validators.required]]
    });
  }

  submitClientData = () => {
    this.clientApi.updateClient(this.datos, this.key);
    this.toastr.success('Actualizado!');
  }


  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
    this.ng2ImgMax.resizeImage(ima, 200, 200).subscribe(
      result => {
        this.uploadedImage = result;
        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(this.uploadedImage);
        myReader.onload = (e) => {
          // this.logo = <string>myReader.result;
          this.datos.logo = <string>myReader.result;
          this.toastr.success('Logo cargado correctamente!');
        };
      },
      error => {
        this.toastr.error('Logo invalido!');
      }
    );
  }

  costo(value) {
    this.costol = num(value, { lang: 'es' });
    this.costol = this.costol.toString();
    this.costol = this.costol[0].toUpperCase() + this.costol.slice(1);
    this.datos.costol = this.costol;
  }

  goBack = () => {
    this.location.back();
  }
}

