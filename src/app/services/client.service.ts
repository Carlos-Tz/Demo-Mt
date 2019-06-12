import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
//import { SurveyForm } from '../models/survey-form';
import { Router } from '@angular/router';

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

  AddClient(client: Client, fecha: string, dia: string, mes: string, anio: string) {
    client.dia = dia;
    client.mes = mes;
    client.anio = anio;
    client.fechai = fecha;
    this.dataList.push(client/* {
      client */
      /* razon: client.razon,
      giro: client.giro,
      nocontrol: client.nocontrol,
      nombre: client.nombre,
      tel: client.tel,
      correo: client.correo,
      id: client.id,
      folio: client.folio,
      fax: client.fax,
      rfc: client.rfc,
      calle: client.calle,
      colonia: client.colonia,
      munic: client.municipio,
      estado: client.estado,
      cp: client.cp,
      tipos: client.tiposerv,
      tension: client.tension,
      cargai: client.carga,

      volts: client.volts,
      costo: client.costo,
      costol: client.costolet,
      instal: client.tipoinst,
      nom1: client.nom001,
      nom7: client.nom007,
      nom13: client.nom013,
      revp: client.revision,
      verfs: client.verfsub,
      verfbt: client.verfbt,
      ambien: client.ambient,
      memo: client.memoria,
      nombreuv: client.nombreuvie,
      iduv: client.iduvie,
      foliouv: client.foliouvie */
    /* } */);
  }

  GetClientsList(key: string) {
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
  }

  /* GetList() {
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
