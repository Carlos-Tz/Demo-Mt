import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ft09',
  templateUrl: './ft09.component.html',
  styleUrls: ['./ft09.component.css']
})
export class Ft09Component implements OnInit {
  public client: {
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
