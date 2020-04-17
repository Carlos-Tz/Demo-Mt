import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
// import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { Datos } from 'src/app/models/datos';
import { ToastrService } from 'ngx-toastr';
import { Ft7 } from 'src/app/models/ft7';
import { F081 } from 'src/app/models/f081';
import { F10 } from 'src/app/models/f10';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clientData: Datos;
  public key: string;
  /* public ft81List: F081[];
  public ft82List: F081[];
  public ft15List: Ft7[];
  public ft07List: Ft7[]; */
  public ft10List: F10[];
  /* public ft06List: F10[];
  public lenft81 = 0;
  public lenft82 = 0;
  public lenft15 = 0;
  public lenft07 = 0; */
  public off = false;
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
      this.off = false;
      this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
        this.clientData = data.datos;
        if (!data.ft10) {
          // console.log('Sin datos en ft10');
          this.clientApi.Getf10(this.key);
          this.clientApi.addft10();
        }
        /* if (!data.ft06) {
          this.clientApi.Getf06(this.key);
          this.clientApi.addft06();
        } */
        /* if (data.ft81) {
          this.clientApi.Getf81(this.key).snapshotChanges().subscribe(re => {
            this.ft81List = [];
            re.forEach(item => {
              const surv = item.payload.toJSON();
              surv['$key'] = item.key;
              this.ft81List.push(surv as F081);
            });
            this.lenft81 = this.ft81List.length;
          });
        }
        if (data.ft82) {
          this.clientApi.Getf82(this.key).snapshotChanges().subscribe(re => {
            this.ft82List = [];
            re.forEach(item => {
              const surv = item.payload.toJSON();
              surv['$key'] = item.key;
              this.ft82List.push(surv as F081);
            });
            this.lenft82 = this.ft82List.length;
          });
        }
        if (data.ft15) {
          this.clientApi.Getf15(this.key).snapshotChanges().subscribe(re => {
            this.ft15List = [];
            re.forEach(item => {
              const surv = item.payload.toJSON();
              surv['$key'] = item.key;
              this.ft15List.push(surv as Ft7);
            });
            this.lenft15 = this.ft15List.length;
          });
        }
        if (data.ft07) {
          this.clientApi.Getf07(this.key).snapshotChanges().subscribe(re => {
            this.ft07List = [];
            re.forEach(item => {
              const surv = item.payload.toJSON();
              surv['$key'] = item.key;
              this.ft07List.push(surv as Ft7);
            });
            this.lenft07 = this.ft07List.length;
          });
        } */
      });
    } else {
      this.off = true;
      this.getClientOffline(this.key);
    }
  }

  /* async addForm() {
    if (this.newF.fecha && this.newF.tipo) {
      if (this.newF.tipo === 'NOM') {
        if (this.offlineOnlineService.isOnline) { // Online
          this.clientApi.Getf81(this.key);
          this.clientApi.addft81(this.newF.fecha, this.lenft81 + 1);
        } else {    // Offline
          this.clientApi.addft81Offline(this.key, this.newF.fecha, this.lenft81 + 1);
          this.ft81List = await this.clientApi.localDb.ft81.where('client').equals(this.key).toArray();
          this.lenft81 = this.ft81List.length;
        }
      }
      if (this.newF.tipo === 'PEC') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.Getf82(this.key);
          this.clientApi.addft82(this.newF.fecha, this.lenft82 + 1);
        } else {
          this.clientApi.addft82Offline(this.key, this.newF.fecha, this.lenft82 + 1);
          this.ft82List = await this.clientApi.localDb.ft82.where('client').equals(this.key).toArray();
          this.lenft82 = this.ft82List.length;
        }
      }
      if (this.newF.tipo === 'RTPE') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.Getf15(this.key);
          this.clientApi.addft15(this.newF.fecha, this.lenft15 + 1);
        } else {
          this.clientApi.addft15Offline(this.key, this.newF.fecha, this.lenft15 + 1);
          this.ft15List = await this.clientApi.localDb.ft15.where('client').equals(this.key).toArray();
          this.lenft15 = this.ft15List.length;
        }
      }
      if (this.newF.tipo === 'AECIE') {
        if (this.offlineOnlineService.isOnline) {
          this.clientApi.Getf07(this.key);
          this.clientApi.addft07(this.newF.fecha, this.lenft07 + 1);
        } else {
          this.clientApi.addft07Offline(this.key, this.newF.fecha, this.lenft07 + 1);
          this.ft07List = await this.clientApi.localDb.ft07.where('client').equals(this.key).toArray();
          this.lenft07 = this.ft07List.length;
        }
      }
    } else {
      this.toastr.warning('Faltan datos!');
    }
    this.newF.fecha = '';
    this.newF.tipo = '';
  } */

  goBack = () => {
    this.location.back();
  }

  async getClientOffline (id: string) {
    /* this.ft81List = [];
    this.ft82List = [];
    this.ft07List = [];
    this.ft15List = []; */
    this.ft10List = [];
    /* this.ft06List = []; */
    this.clientApi.localDb.clients
      .get(id).then(async (client) => {
        this.clientData = client.datos;
        /* this.ft10List = await this.clientApi.localDb.ft10.where('client').equals(id).toArray();
        if (this.ft10List.length === 0) {
          this.clientApi.addFt10Offline(id);
        } */
        /* this.ft06List = await this.clientApi.localDb.ft06.where('client').equals(id).toArray();
        if (this.ft06List.length === 0) {
          this.clientApi.addFt06Offline(id);
        } */
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    /* this.ft07List = await this.clientApi.localDb.ft07.where('client').equals(id).toArray();
    this.lenft07 = this.ft07List.length;
    this.ft15List = await this.clientApi.localDb.ft15.where('client').equals(id).toArray();
    this.lenft15 = this.ft15List.length;
    this.ft81List = await this.clientApi.localDb.ft81.where('client').equals(id).toArray();
    this.lenft81 = this.ft81List.length;
    this.ft82List = await this.clientApi.localDb.ft82.where('client').equals(id).toArray();
    this.lenft82 = this.ft82List.length; */
  }

  /* addFt10Offline (id: string) {
    this.clientApi.localDb.clients.put({ id: id, ft10: { id_: 1, nom: 'ok1'}});
  } */

  /* updateFi() {
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
  } */
  /* updateFt07(ft: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.upft07(ft.fecha, key, ft.$key);
    } else {
      this.clientApi.upft07Off(ft.fecha, ft.id);
    }
    this.toastr.success('Fecha guardada!');
  }
  updateFt15(ft: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
    this.clientApi.upf15(ft.fecha, key, ft.$key);
    } else {
      this.clientApi.upft15Off(ft.fecha, ft.id);
    }
    this.toastr.success('Fecha guardada!');
  }
  updateFt81(ft: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
    this.clientApi.upf81(ft.fecha, key, ft.$key);
    } else {
      this.clientApi.upft81Off(ft.fecha, ft.id);
    }
    this.toastr.success('Fecha guardada!');
  }
  updateFt82(ft: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
    this.clientApi.upf82(ft.fecha, key, ft.$key);
    } else {
      this.clientApi.upft82Off(ft.fecha, ft.id);
    }
    this.toastr.success('Fecha guardada!');
  } */
}
