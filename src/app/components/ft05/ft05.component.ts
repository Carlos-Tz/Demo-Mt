import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ft05',
  templateUrl: './ft05.component.html',
  styleUrls: ['./ft05.component.css']
})
export class Ft05Component implements OnInit {
  public client: {
    razon: '',
    nocontrol: '',
    anio: '',
    mes: '',
    dia: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
      });
    }
  }

  goBack = () => {
    this.location.back();
  }
}
