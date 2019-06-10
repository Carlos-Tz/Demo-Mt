import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-ft01',
  templateUrl: './ft01.component.html',
  styleUrls: ['./ft01.component.css']
})
export class Ft01Component implements OnInit {
  public client: {};

  constructor(
    private clientApi: ClientService
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
        if (this.client) {
          console.log('ok', this.client);
        } else {
          console.log('Sin expediente');
        }
      });
    }
  }

}
