import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Fecha } from '../models/fecha';
import { Signs } from '../models/signs';
import { F05 } from '../models/f05';
import { F06 } from '../models/f06';
import { F07 } from '../models/f07';
import { F09 } from '../models/f09';
import { F11 } from '../models/f11';
import { F081 } from '../models/f081';
/* import { F082 } from '../models/f082';
import { F08E } from '../models/f08-e'; */

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientsList: AngularFireList<any>;
  public dataList: AngularFireList<any>;
  public clientObject: AngularFireObject<any>;
  public currentD = '';
  public client = {};
  constructor(private db: AngularFireDatabase, private router: Router) { }

  AddClient(client: Client, fecha: Fecha, signs: Signs, logo: string, costol: string) {
    client.dia = fecha.dia;
    client.mes = fecha.mes;
    client.anio = fecha.anio;
    client.fechai = fecha.fecha;
    client.s1 = signs.s1;
    client.s2 = signs.s2;
    client.s3 = signs.s3;
    client.date = Date.now();
    client.logo = logo;
    client.costol = costol;
    this.dataList.push(client);
  }

 /*  GetClientsList(key: string) {
    this.clientsList = this.db.list('data/' + key + '/clients', ref =>
      ref.orderByChild('date')
    );
    return this.clientsList;
  }

  getOneClient(key: string, key2: string) {
    this.clientObject = this.db.object('data/' + key + '/clients' + key2);
    return this.clientObject;
  }

  getAll(key: string) {
    return this.db.list('data/' + key + '/clients')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val() }));
        })
      );
  } */

  /* GetList() {/////////////*     /
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('date').limitToLast(1)
    );
    return this.dataList;
  }
 */
  GetDataList() {
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('date')
    );
    return this.dataList;
  }

  getCurrentData(key: string) {
    this.clientObject = this.db.object('data/' + key);
    return this.clientObject;
  }


  UpdateFt05(f05: F05, key: string) {
    this.db.object('data/' + key)
    .update({ ft05: f05 });
  }

  UpdateFt06(f06: F06, key: string) {
    this.db.object('data/' + key)
    .update({ ft06: f06 });
  }

  UpdateFt07(f07: F07, key: string) {
    this.db.object('data/' + key)
    .update({ ft07: f07 });
  }

  UpdateFt09(f09: F09, key: string) {
    this.db.object('data/' + key)
    .update({ ft09: f09 });
  }

  UpdateFt11(f11: F11, key: string) {
    this.db.object('data/' + key)
    .update({ ft11: f11 });
  }

  UpdateFt08INCIE1(f08: F081, key: string) {
    this.db.object('data/' + key)
    .update({ ft08i1: f08 });
  }

  /* UpdateFt08INCIE2(f08: F082, key: string) {
    this.db.object('data/' + key)
    .update({ ft08i2: f08 });
  } */

  UpdateFt08INCPE(f08: F081, key: string) {
    this.db.object('data/' + key)
    .update({ ft08ie: f08 });
  }
}
