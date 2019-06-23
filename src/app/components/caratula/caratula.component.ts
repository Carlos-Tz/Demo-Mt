import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-caratula',
  templateUrl: './caratula.component.html',
  styleUrls: ['./caratula.component.css']
})
export class CaratulaComponent implements OnInit {
  public client: {
    anio: ''
  };

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
      });
    }
  }
  goBack = () => {
    this.location.back();
  }
}
