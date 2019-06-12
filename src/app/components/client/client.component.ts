import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clientData: {};
  public key: string;
  constructor(
    private actRouter: ActivatedRoute,
    public clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.clientApi.getCurrentData(this.key).valueChanges().subscribe(data => {
      this.clientData = data;
      //console.log(this.clientData);
     // this.client = data.clients[key2];
     // console.log(this.survey.question1);
    });
  }

  goBack = () => {
    this.location.back();
  }
}
