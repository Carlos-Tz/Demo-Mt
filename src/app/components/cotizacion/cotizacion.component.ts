import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import 'fecha';
import fechaObj from 'fecha'; */
import { ClientService } from 'src/app/services/client.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import * as num from 'written-number';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  costol = '';
  // fechaS: Date;
  /* uploadedImage: Blob;
  public logo = ''; */
 /*  public razon = '';
  public nombreuv = ''; */
  /* public fecha = {
    fecha: '',
    dia: '',
    mes: '',
    anio: ''
  }; */
  /* public signs = {
    s1: '',
    s2: '',
    s3: ''
  }; */
  public clientForm: FormGroup;
  public dataList = [];
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
    private ng2ImgMax: Ng2ImgMaxService,
    public fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private router: Router,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    /* this.fecha.dia = fechaObj.format(new Date(), 'D');
    this.fecha.mes = fechaObj.format(new Date(), 'MM');
    this.fecha.anio = fechaObj.format(new Date(), 'YY');
    this.fecha.fecha = fechaObj.format(new Date(), 'D [de] MMM [del] YYYY'); */
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.GetDataList();
    }
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
    /* console.log(this.fechaS);
    console.log(this.fechaS.getFullYear());
    console.log(this.fechaS.getDate()); */
    this.clientApi.AddClient(this.clientForm.value, this.costol);
    this.toastr.success('Guardado!');
    this.ResetForm();
    this.router.navigate(['/']);
  }

  /* imgChanged($event) {
    this.signs.s1 = $event.target.src;
  }

  imgChanged2($event) {
    this.signs.s2 = $event.target.src;
  }

  imgChanged3($event) {
    this.signs.s3 = $event.target.src;
  } */

  /* changeListener($event): void {
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
         this.logo = <string>myReader.result;
          this.toastr.success('Logo cargado correctamente!');
        };
      },
      error => {
        this.toastr.error('Logo invalido!');
      }
    );
  } */

  costo(value) {
    this.costol =  num(value, {lang: 'es'});
    this.costol = this.costol.toString();
    this.costol = this.costol[0].toUpperCase() + this.costol.slice(1);
  }
}
