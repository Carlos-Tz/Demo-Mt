import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-caratula',
  templateUrl: './caratula.component.html',
  styleUrls: ['./caratula.component.css']
})
export class CaratulaComponent implements OnInit {
  public client: {};

  constructor(
    private clientApi: ClientService
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
        /* if (this.client) {
          console.log('ok', this.client);
        } else {
          console.log('Sin expediente');
        } */
      });
    }
  }
}
