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
  cents = '';
  public key = '';
  
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
    this.cForm();
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
        // this.datos = data.datos;
        this.clientForm.patchValue(data.datos);
        if (data.datos.costo) {
          this.costo(data.datos.costo);
        }
        if (data.datos.cent) {
          this.centavos(data.datos.cent);
        }
      });
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        // this.datos = client.datos;
        this.clientForm.patchValue(client.datos);
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
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
        cent: [0],
        instal: [''],
        nomcom: [''],
        ambien: [''],
        memo: [''],
        nombreuv: [''],
        nombrers: [''],
        fft02: [''],
        fft03: [''],
        fft05: [''],
        fft06: [''],
        fft09: [''],
        fft10: [''],
        fft11: [''],
        fft12: [''],
        fft13: [''],
        ffc07: [''],
        fft08ie1: [''],
        fft08ie2: [''],
        fft08pe1: [''],
        fft08pe2: [''],
        fft151: [''],
        fft152: [''],
        fft071: [''],
        fft072: [''],
        logo: [''],
        fechaf: [''],
        cargouv: [''],
        fpago: [''],
        vigencia: [''],
        intro: [''],
        intro2: [''],
        dia: [''],
        mes: [''],
        anio: [''],
        date: [''],
        s1: [''],
        s2: [''],
        id: [''],
        id2: [''],
        folio: [''],
        folio2: [''],
        cedula: ['']
    });
  }

  submitClientData = () => {
    this.clientApi.updateClient(this.clientForm.value, this.key);
    this.toastr.success('Actualizado!');
  }


  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
    this.ng2ImgMax.resizeImage(ima, 400, 400).subscribe(
      result => {
        this.uploadedImage = result;
        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(this.uploadedImage);
        myReader.onload = (e) => {
          // this.logo = <string>myReader.result;
          this.clientForm.patchValue({logo: <string>myReader.result});
          // this.datos.logo = <string>myReader.result;
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
    // this.datos.costol = this.costol;
    this.clientForm.patchValue({costol: this.costol});
  }

  goBack = () => {
    this.location.back();
  }

  centavos(val: number) {
    if (val < 10) {
      this.cents = `0${val}`;
    } else {
      this.cents = `${val}`;
    }
  }

  changeTipoS(value: string) {
    if (value) {
      if (value === 'nueva') {
        this.clientForm.patchValue({tipos: 'Instalación nueva'});
      }
      if (value === 'ampliacion') {
        this.clientForm.patchValue({tipos: 'Ampliación de una instalación existente'});
      }
      if (value === 'verificacion') {
        this.clientForm.patchValue({tipos: 'Verificación periodica de instalación con áreas peligrosas'});
      }
      if (value === 'subestacion') {
        this.clientForm.patchValue({tipos: 'Subestación para cambio de tensión para la alimentación de la instalación'});
      }
      if (value === 'nom001') {
        this.clientForm.patchValue({tipos: 'Instalación construida antes de la entrada en vigor de la NOM-001-SEDE-2012'});
      }
      if (value === 'otro') {
        this.clientForm.patchValue({tipos: ''});
      }
    } else {
      this.clientForm.patchValue({tipos: ''});
    }
  }

  changeResp(value: string) {
    if (value) {
      if (value === 'ing1') {
        this.clientForm.patchValue({nombreuv: 'Ing. Héctor Martínez Peña'});
      }
      if (value === 'ing2') {
        this.clientForm.patchValue({nombreuv: 'Ing. Hugo Martínez Peña'});
      }
      if (value === 'ing3') {
        this.clientForm.patchValue({nombreuv: 'Ing. Salvador Martínez Tenorio'});
      }
      if (value === 'otro') {
        this.clientForm.patchValue({nombreuv: ''});
      }
    } else {
      this.clientForm.patchValue({nombreuv: ''});
    }
  }

  changeSub(value: string) {
    if (value) {
      if (value === 'cero') {
        this.clientForm.patchValue({sub: '0.0'});
      }
      if (value === 'compartida') {
        this.clientForm.patchValue({sub: 'Subestación compartida'});
      }
      if (value === 'cfe') {
        this.clientForm.patchValue({sub: 'Subestación CFE'});
      }
      if (value === 'otro') {
        this.clientForm.patchValue({sub: ''});
      }
    } else {
      this.clientForm.patchValue({sub: ''});
    }
  }

  changeArea(value: string) {
    if (value) {
      if (value === 'definir') {
        this.clientForm.patchValue({area: 'Por definir'});
      }
      if (value === 'otro') {
        this.clientForm.patchValue({area: ''});
      }
    } else {
      this.clientForm.patchValue({area: ''});
    }
  }

  changeInst(value: string) {
    if (value) {
      if (value === 'publica') {
        this.clientForm.patchValue({instal: 'Concentración pública'});
      }
      if (value === 'peligrosa') {
        this.clientForm.patchValue({instal: 'Áreas peligrosas'});
      }
      if (value === 'industria') {
        this.clientForm.patchValue({instal: 'Industria'});
      }
      if (value === 'otro') {
        this.clientForm.patchValue({instal: ''});
      }
    } else {
      this.clientForm.patchValue({instal: ''});
    }
  }
}

