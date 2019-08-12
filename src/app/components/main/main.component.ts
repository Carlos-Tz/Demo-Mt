import { Component, OnInit } from '@angular/core';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public toastr: ToastrService,
    public clientApi: ClientService,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  async ngOnInit() {
    const allItems: Client[] = await this.clientApi.localDb.clients.toArray();

    if (this.offlineOnlineService.isOnline && allItems.length > 0) {
      this.clientApi.sendItemsFromIndexedDb();
      this.toastr.success('Actualización online!');
    }
  }

}
