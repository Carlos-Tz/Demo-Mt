import { Component, OnInit } from '@angular/core';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public dtOptions = {};
  public data_ = false;
  public data_2 = false;
  public dataList: Client[];
  public anioList: number[];
  constructor(
    public clientApi: ClientService,
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
    if (this.offlineOnlineService.isOnline) {
      this.clientApi.GetDataList().snapshotChanges().subscribe(re => {
        this.anioList = [];
        re.forEach(item => {
          const surv: any = item.payload.toJSON();
          const anio: number = parseInt(surv.datos.anio, 10);
          if (this.anioList.indexOf(anio) === -1) {
            this.anioList.push(anio);
          }
        });
        this.data_ = true;
        this.anioList.sort();
        this.anioList.reverse();
      });
    } else {
      this.getDataOffline();
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
}
