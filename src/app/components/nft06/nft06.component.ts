import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { F10 } from 'src/app/models/f10';
import { ActivatedRoute } from '@angular/router';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { ToastrService } from 'ngx-toastr';
declare const pdfExport: any;

@Component({
  selector: 'app-nft06',
  templateUrl: './nft06.component.html',
  styleUrls: ['./nft06.component.css']
})
export class Nft06Component implements OnInit {
  public client: {
    razon: '',
    nocontrol: '',
    tension: '',
    cargai: '',
    dia: '',
    mes: '',
    anio: '',
    fft06: ''
  };
  public ff = {
    a: '',
    m: '',
    d: ''
  };
  public month = '';
  public pages: number[];
  public ft06List: F10[];
  public len = 1;
  public key = '';
  public page0 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor(
    private clientApi: ClientService,
    private location: Location,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  async ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
          if (this.client.fft06) {
            this.ff = this.clientApi.splitDate(this.client.fft06);
            this.month = this.clientApi.monthToRoman(this.ff.m);
          }
          if (!data.ft06) {
            /* this.clientApi.Getf06(this.key);
            this.clientApi.addft06(); */
          }
        });
      }
      /* this.clientApi.Getf06(this.key).snapshotChanges().subscribe(re => {
        this.ft06List = [];
        re.forEach(item => {
          const surv = item.payload.toJSON();
          surv['$key'] = item.key;
          this.ft06List.push(surv as F10);
        });
        this.len = Math.ceil((this.ft06List.length) / 14);
        this.pages = this.page0.slice(0, this.len);
      }); */
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
        if (this.client.fft06) {
          this.ff = this.clientApi.splitDate(this.client.fft06);
          this.month = this.clientApi.monthToRoman(this.ff.m);
        }
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
      this.ft06List = [];
      this.ft06List = await this.clientApi.localDb.ft06.where('client').equals(this.key).toArray();
      this.len = Math.ceil((this.ft06List.length) / 14);
      this.pages = this.page0.slice(0, this.len);
      this.ft06List.sort((a, b) => {
        return a.id_ - b.id_;
      });
    }
  }

  goBack = () => {
    this.location.back();
  }

  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'ft-06', true);
  }
}

