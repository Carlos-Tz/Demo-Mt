import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Fecha } from '../models/fecha';
import { Signs } from '../models/signs';

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
    //console.log(this.clientObject);
    return this.clientObject;
  }

  /* UpdateSurvey(surveyF: SurveyForm) {
    this.dataList.push({
      p1: surveyF.p1,
      p2: surveyF.p2,
      p3: surveyF.p3,
      p4: surveyF.p4,
      p5: surveyF.p5,
      p6: surveyF.p6,
      p7: surveyF.p7,
      p8: surveyF.p8,
      p9: surveyF.p9,
      date: Date.now()
    });
  } */
}
