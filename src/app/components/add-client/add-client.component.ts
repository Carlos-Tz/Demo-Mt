import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import 'fecha';
import fechaObj from 'fecha';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  public fecha = '';
  public dia = '';
  public mes = '';
  public anio = '';
  public razon = '';
  public nombreuv = '';
  public clientForm: FormGroup;
  public dataList = [];
  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dia = fechaObj.format(new Date(), 'D');
    this.mes = fechaObj.format(new Date(), 'MMMM');
    this.anio = fechaObj.format(new Date(), 'YY');
    this.fecha = fechaObj.format(new Date(), 'D [de] MMM [del] YYYY');
    this.clientApi.GetDataList();
    this.cForm();
  }

  cForm() {
    this.clientForm = this.fb.group({
      razon: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      nocontrol: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tel: [''],
      correo: [''],
      id: [''],
      folio: [''],
      fax: [''],
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
      foliouv: ['']
    });
  }

  ResetForm() {
    this.clientForm.reset();
  }

  submitClientData = () => {
    this.clientApi.AddClient(this.clientForm.value, this.fecha, this.dia, this.mes, this.anio);
    this.toastr.success('Guardado!');
    this.ResetForm();
  }
}
