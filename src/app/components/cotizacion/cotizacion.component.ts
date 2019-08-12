import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import 'fecha';
import fechaObj from 'fecha'; */
import { ClientService } from 'src/app/services/client.service';
// import { Ng2ImgMaxService } from 'ng2-img-max';
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
  public clientForm: FormGroup;
  public dataList = [];
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
  //  private ng2ImgMax: Ng2ImgMaxService,
    public fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private router: Router,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
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
  //    id: [''],
  //    folio: [''],
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
  //    nom1: [''],
  //    nom7: [''],
  //    nom13: [''],
  //    revp: [''],
  //    verfs: [''],
  //    verfbt: [''],
      ambien: [''],
      memo: [''],
      nombreuv: ['Ing.Héctor Martínez Peña'],
 //     iduv: [''],
 //     foliouv: [''],
      fft02: [''],
      fft03: [''],
      fft05: [''],
      fft06: [''],
      fft09: [''],
      fft10: [''],
      fft11: [''],
      ffc07: [''],
  //    mesl: [''],
  //    s1: [''],
  //    s2: [''],
 //     s3: [''],
      logo: [''],
      fechaf: [''],
      cargouv: ['Verificador'],
      fpago: [''],
      vigencia: [''],
      intro: ['']
    });
  }

  ResetForm() {
    this.clientForm.reset();
  }

  submitClientData = () => {
    this.clientApi.AddClient(this.clientForm.value, this.costol);
    this.toastr.success('Guardado!');
    this.ResetForm();
    this.router.navigate(['/']);
  }

  costo(value) {
    this.costol =  num(value, {lang: 'es'});
    this.costol = this.costol.toString();
    this.costol = this.costol[0].toUpperCase() + this.costol.slice(1);
  }
}
