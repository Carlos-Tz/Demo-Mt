import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { F10 } from 'src/app/models/f10';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ft10',
  templateUrl: './ft10.component.html',
  styleUrls: ['./ft10.component.css']
})
export class Ft10Component implements OnInit {
  public client: {
    razon: '',
    nocontrol: '',
    tension: '',
    cargai: '',
    dia: '',
    mes: '',
    anio: ''
  };
  public pages: number[];
  public ft10List: F10[];
  public len = 1;
  public key = '';
  public page0 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  constructor(
    private clientApi: ClientService,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRoute.snapshot.paramMap.get('key');
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data.datos;
        /* if (data.ft10) {
          for (const i in data.ft10) {
            this.ft10List.push(data.ft10[i] as F10);
          }
          this.len = Math.ceil((this.ft10List.length) / 18);
          this.pages = this.page0.slice(0, this.len);
        } */
      });
    }
    this.clientApi.Getf10(this.key).snapshotChanges().subscribe(re => {
      this.ft10List = [];
      re.forEach(item => {
        const surv = item.payload.toJSON();
        surv['$key'] = item.key;
        this.ft10List.push(surv as F10);
      });
     //this.data_ = true;
      this.len = Math.ceil((this.ft10List.length) / 18);
      this.pages = this.page0.slice(0, this.len);
     // console.log(this.ft10List[1]);
    });
  }

  goBack = () => {
    this.location.back();
  }
}
