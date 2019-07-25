import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

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
  constructor(
    public clientApi: ClientService,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 15,
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

    if (this.offlineOnlineService.isOnline) {
      this.clientApi.GetDataList().snapshotChanges().subscribe(re => {
        this.dataList = [];
        re.forEach(item => {
          const surv = item.payload.toJSON();
          surv['$key'] = item.key;
          this.dataList.push(surv as Client);
        });
        this.data_ = true;
      });
    } else {
      this.clientApi.getDataOffline();
      if (this.clientApi.dataOffline) {
        this.dataList = this.clientApi.dataOffline;
        this.data_2 = true;
      }
    }
  }

}
