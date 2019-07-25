import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { Datos } from 'src/app/models/datos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clientData: Datos;
  public key: string;
  public newF = {
    fecha: '',
    tipo: ''
  };
  constructor(
    public toastr: ToastrService,
    private actRouter: ActivatedRoute,
    public clientApi: ClientService,
    private location: Location,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
        this.clientData = data.datos;
        if (!data.ft10) {
          // console.log('Sin datos en ft10');
          this.clientApi.Getf10(this.key);
          this.clientApi.addft10();
        }
      });
    } else {
      this.clientApi.getClientOffline(this.key);
      this.clientData = this.clientApi.clientOffline.datos;
    }
  }

  addForm() {
    if (this.newF.fecha && this.newF.tipo) {
      console.log(this.newF.fecha + '::' + this.newF.tipo);
    } else {
      console.log('Empty!!');
    }
  }

  goBack = () => {
    this.location.back();
  }

  updateFi() {
    this.clientApi.upfi(this.clientData.fechai, this.key);
    this.toastr.success('Fecha guardada!');
  }

  updateFt02() {
    this.clientApi.upf02(this.clientData.fft02, this.key);
    this.toastr.success('Fecha guardada!');
  }

  updateFt03() {
    this.clientApi.upf03(this.clientData.fft03, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFt05() {
    this.clientApi.upf05(this.clientData.fft05, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFt06() {
    this.clientApi.upf06(this.clientData.fft06, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFt09() {
    this.clientApi.upf09(this.clientData.fft09, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFt10() {
    this.clientApi.upf10(this.clientData.fft10, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFt11() {
    this.clientApi.upf11(this.clientData.fft11, this.key);
    this.toastr.success('Fecha guardada!');
  }
  updateFc07() {
    this.clientApi.upfc07(this.clientData.ffc07, this.key);
    this.toastr.success('Fecha guardada!');
  }
}
