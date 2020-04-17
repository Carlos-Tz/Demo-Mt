import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public dtOptions = {};
  public data_ = false;
  public data_2 = false;
  public dataList: Client[];
  public key = '';
  constructor(
    public clientApi: ClientService,
    private actRouter: ActivatedRoute,
    private location: Location,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 12,
      order: [[0, 'desc']],
      // Configure the buttons
      buttons: [],
      language: {
        paginate: {
          first: '«',
          previous: '‹',
          next: '›',
          last: '»'
        },
        aria: {
          paginate: {
            first: 'Primero',
            previous: 'Anterior',
            next: 'Siguiente',
            last: 'Último'
          }
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
        search: 'Buscar',
        emptyTable: ' '
      },
      info: false
    };
    this.key = this.actRouter.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.GetDataListA(this.key).snapshotChanges().subscribe(re => {
        this.dataList = [];
        re.forEach(item => {
          const surv = item.payload.toJSON();
          surv['$key'] = item.key;
          this.dataList.push(surv as Client);
        });
        this.data_ = true;
      });
    } else {
      this.getDataOffline();
      /* this.clientApi.getDataOffline();
      if (this.clientApi.dataOffline) {
        this.dataList = this.clientApi.dataOffline;
        this.data_2 = true;
      } */
    }
  }

  async getDataOffline () {
    this.dataList = [];
    this.dataList = await this.clientApi.localDb.clients.toArray();
    this.data_2 = true;
  }

  goBack = () => {
    this.location.back();
  }

  deleteForm(form: any) {
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      this.clientApi.DeleteForm(form.$key);
      this.data_ = false;
      this.clientApi.GetDataListA(this.key).snapshotChanges().subscribe(re => {
        this.dataList = [];
        re.forEach(item => {
          const surv = item.payload.toJSON();
          surv['$key'] = item.key;
          this.dataList.push(surv as Client);
        });
        this.data_ = true;
      });
    }
  }
}
