import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare const pdfExport: any;

@Component({
  selector: 'app-caratula',
  templateUrl: './caratula.component.html',
  styleUrls: ['./caratula.component.css']
})
export class CaratulaComponent implements OnInit {
  public client: {
    anio: '',
    razon: '',
    giro: '',
    nocontrol: '',
    nomcom: ''
  };
  public key = '';

  constructor(
    public toastr: ToastrService,
    private clientApi: ClientService,
    private actRouter: ActivatedRoute,
    private location: Location,
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    if (this.offlineOnlineService.isOnline) {
      if (this.clientApi.clientObject) {
        this.clientApi.clientObject.valueChanges().subscribe(data => {
          this.client = data.datos;
        });
      }
    } else {
      this.clientApi.localDb.clients
      .get(this.key).then(async (client) => {
        this.client = client.datos;
      })
      .catch(e => {
        this.toastr.warning('Intentalo de nuevo!!');
      });
    }
  }
  goBack = () => {
    this.location.back();
  }

  savePDF() {
    pdfExport(this.key, this.client.anio, this.client.nocontrol, 'caratula', false);
  }
}
