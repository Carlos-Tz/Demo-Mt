import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Fecha } from '../models/fecha';
// import { Signs } from '../models/signs';
import { F05 } from '../models/f05';
import { F06 } from '../models/f06';
import { F07 } from '../models/f07';
import { F09 } from '../models/f09';
import { F11 } from '../models/f11';
import { F081 } from '../models/f081';
import { Datos } from '../models/datos';
import { F10 } from '../models/f10';
import { OfflineOnlineService } from './offline-online.service';
import { UUID } from 'angular2-uuid';
import Dexie from 'dexie';
import { F02 } from '../models/f02';
import { F03 } from '../models/f03';
import { Ft7 } from '../models/ft7';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public localDb: any;
  public dataOffline: Client[] = [];
  public clientOffline: Client;
  // public clientsList: AngularFireList<any>;
  public dataList: AngularFireList<any>;
  public dataft10List: AngularFireList<any>;
  public ft10List: AngularFireList<any>;
  // public ft06List: AngularFireList<any>;
  // public ft81List: AngularFireList<any>;
  // public ft82List: AngularFireList<any>;
  // public ft07List: AngularFireList<any>;
  // public ft15List: AngularFireList<any>;
  // public f151: AngularFireList<any>;
  // public f152: AngularFireList<any>;
  // public f71: AngularFireList<any>;
  // public f72: AngularFireList<any>;
  // public f811: AngularFireList<any>;
  // public f812: AngularFireList<any>;
  // public f822: AngularFireList<any>;
  // public f821: AngularFireList<any>;
  public ft10: F10[];
  public clientObject: AngularFireObject<any>;
  public f10Object: AngularFireObject<any>;
  // public f06Object: AngularFireObject<any>;
  // public f81Object: AngularFireObject<any>;
  // public f07Object: AngularFireObject<any>;
  public deleteObject: AngularFireObject<any>;
  public f10 = [
    {
      id_: 1,
      nom: '',
      tex: '110 Requisitos generales',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 2,
      nom: '110-2',
      tex: 'Aprobación',
      tip: 'O',
      cri: 'Los materiales y equipos utilizados están aprobados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 4,
      nom: '110-7',
      tex: 'Integridad de aislamiento',
      tip: 'O,M',
      cri: 'El sistema esta libre de corto circuito y de conexiones a tierra por falla. PEC5.1',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 5,
      nom: '110-9',
      tex: 'Corriente de interrupción',
      tip: 'O',
      cri: 'Los interruptores tienen un rango de operación suficiente',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 6,
      nom: '110-12',
      tex: 'Ejecución mecánica de los trabajos',
      tip: 'O',
      cri: 'Los equipos están instalados de manera limpia y profesional',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 7,
      nom: '10-12 a )',
      tex: 'Aberturas no utilizadas',
      tip: 'O',
      cri: 'Las aberturas no utilizadas en las canalizaciones están cerradas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 8,
      nom: '110-13',
      tex: 'Montaje y enfriamiento del equipo',
      tip: 'O',
      cri: 'El equipo esta montado de manera segura, anclado y el espacio de ventilación es adecuado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 9,
      nom: '110-14 a ) 110-14 b) 110-14 c )',
      tex: 'Conexiones eléctricas terminales y empalmes Limitaciones de temperatura',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores esta conectados con dispositivos adecuados El conductor no excede la temperatura de operación de terminales del equipo',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 10,
      nom: '110-16',
      tex: 'Señales de advertencia contra arco eléctrico',
      tip: '',
      // tslint:disable-next-line: max-line-length
      cri: 'Los tableros de distribución, tableros de control industrial, envolventes para medidores enchufables y centros de control de motores, deben estar marcados para advertir del peligro potencial de arco eléctrico',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 11,
      nom: '110-26',
      tex: 'Espacio de trabajo',
      tip: 'O',
      cri: 'Alrededor del equipo existe suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 12,
      nom: '110-22',
      tex: 'Identificación de los medios de desconexión',
      tip: 'O',
      cri: 'Los medios de desconexión están identificados indicando su propósito',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 13,
      nom: '110-31',
      tex: 'Envolventes de las instalaciones eléctricas',
      tip: '',
      cri: 'Cuando el acceso sea controlado, solo deben ser accesibles por personal calificado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 14,
      nom: '',
      tex: '210 Circuitos derivados',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 15,
      nom: '210-3',
      tex: 'Clasificación',
      tip: 'O',
      cri: 'Los circuitos están clasificados según la capacidad de conducción de corriente máxima ó según el valor de la protección',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 16,
      nom: '210-5',
      tex: 'Identificación de los circuitos derivados',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El conductor de puesto a tierra es blanco y el de puesta a tierra es desnudo y verde, las fases de color diferente, como, azul, negra, roja',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 17,
      nom: '210-19 210-20',
      tex: 'Conductores tamaño nominal Protección contra sobre-corriente',
      tip: 'O',
      cri: 'El tamaño de conductores corresponde con la carga y están protegidos contra sobre-corriente',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 18,
      nom: '210-21 210-24',
      tex: 'Dispositivos de salida Requisitos de los circuitos derivados- resumen',
      tip: 'O',
      cri: 'Los circuitos tienen las capacidades nominales permitidas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 19,
      nom: '220-12',
      tex: 'Cargas de alumbrado para lugares especificos',
      tip: 'O',
      cri: 'Los circuitos están previstos para las cargas calculadas, según 220-12',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 20,
      nom: '210-23',
      tex: 'Cargas permisibles',
      tip: 'D',
      cri: 'Los circuitos alimentan las cargas permisibles',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 21,
      nom: '',
      tex: '215 Alimentadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 22,
      nom: '215-2',
      tex: 'Capacidad nominal y tamaño mínimo del conductor',
      tip: 'O',
      cri: 'Los alimentadores tienen el tamaño mínimo requerido',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 23,
      nom: '215-3 220-12',
      tex: 'Protección contra sobre-corriente Capacidad de conducción de corriente',
      tip: 'O',
      cri: 'El interruptor y el conductor son del tamaño adecuado para las cargas continuas y no continuas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 24,
      nom: '220-12 220-61',
      tex: 'Capacidad de conducción de corriente Carga del neutro del alimentador',
      tip: 'D',
      cri: 'Los conductores son adecuados para la carga',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 25,
      nom: '215-5',
      tex: 'Diagrama Unifilar de Alimentadores',
      tip: 'O',
      cri: 'Contenga M2 , carga conectada, FD, datos conductor, %e, canalizaciones',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 26,
      nom: '215-10 230-95',
      tex: 'Protección a tierra Protección del equipo contra falla a tierra',
      tip: 'O',
      cri: 'Los interruptores deben tener protección de falla a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 27,
      nom: '',
      tex: '225 Circuitos Derivados y Alimentadores Exteriores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 28,
      nom: '225-10 225-20 225-22',
      // tslint:disable-next-line: max-line-length
      tex: 'Alambrado de los edificios Protección mecánica de los conductores Canalizaciones sobre las superficies externas de las construcciones',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Se permiten diferentes métodos de alambrado que protejan a los conductores contras daño mecánico, en exterior deben ser herméticas a la lluvia',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 29,
      nom: '225-15 225-18',
      tex: 'Soporte sobre edificios Libramiento para conductores y cables aéreos',
      tip: 'O',
      cri: 'Conductores apoyados en estructuras sólidas Para diferentes condiciones la altura varía de 3.0 a 5.5 M',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 30,
      nom: '240-4 240-21 240-21 b) 1)',
      tex: 'Protección de los conductores Ubicación en el circuito Derivaciones no mayores a 3.0 m de largo',
      tip: 'O',
      cri: 'Los conductores están debidamente protegidos por interruptores conectados al inicio y en cada conductor de fase',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 31,
      nom: '',
      tex: '230 Acometidas',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 32,
      nom: '230-8',
      tex: 'Aplicado de Selladores en las canalizaciones',
      tip: 'O',
      cri: 'La canalización subterránea esta sellada en ambos extremos',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 33,
      nom: '230-24 230-26 230-27',
      tex: 'Libramientos Punto de sujeción Medios de sujeción',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Entre los conductores de acometida existen distancias adecuadas de seguridad y no son fácilmente accesibles. Están firmemente sujetos',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 34,
      nom: '230-32 230-50 a)',
      tex: 'Protección contra daños Protección contra daño físico en acometidas subterráneos',
      tip: 'O',
      cri: 'La acometida subterránea está protegida y a una profundidad de 50 CM',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 35,
      nom: '230-23 230-31 230-42',
      tex: 'Tamaño y ampacidad del conductor',
      tip: 'O',
      cri: 'Las capacidades nominales y calibres de los conductores son los adecuados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 36,
      nom: '230-82 250-24 b)',
      tex: 'Equipo conectado en el lado línea del medio de desconexión de los conductores de recepción del suministro',
      tip: 'O',
      cri: 'Los gabinetes y partes metálicas del equipo de acometida están conectados a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 37,
      nom: '230-24 230-208 230-66',
      tex: 'Espacio de trabajo Requisitos de protección contra sobrecorriente Marcado',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Existe espacio de trabajo alrededor del equipo de acometida. El interruptor tiene la capacidad interruptiva adecuada. El equipo está aprobado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 38,
      nom: '230-79 230-80',
      tex: 'Capacidad del equipo de desconexión Capacidades combinadas de los medios de desconexión',
      tip: 'O',
      cri: 'Las capacidades nominales de los medios de desconexión son las adecuadas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 39,
      nom: '',
      tex: '240 Protección contra Sobrecorriente',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 40,
      nom: '240-4',
      tex: 'Protección de los conductores',
      tip: 'O',
      cri: 'Los conductores están protegidos contra sobrecorriente de acuerdo a su ampacidad',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 41,
      nom: '240-12',
      tex: 'Coordinación del sistema eléctrico',
      tip: 'O',
      cri: 'Existe una coordinación de protecciones contra cortocircuito.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 42,
      nom: '240-15',
      tex: 'Conductores de fase',
      tip: 'O',
      cri: 'Existen dispositivos de protección contra sobrecorriente requerido.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 43,
      nom: '240-21',
      tex: 'Ubicación en el circuito',
      tip: 'O',
      cri: 'Existe la protección contra sobrecorriente en cada conductor de fase de circuito.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 44,
      nom: '240-30 a)',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los dispositivos de sobrecorriente están protegidos contra daño físico.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 45,
      nom: '240-83 c)',
      tex: 'Valor nominal de interrupción',
      tip: 'O',
      cri: 'Todos los interruptores están marcados su valor nominal de interrupción.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 46,
      nom: '240-90',
      tex: 'General',
      tip: 'O',
      cri: 'Las protecciones contra sobrecorriente en las áreas industriales están supervisadas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 47,
      nom: '240-100',
      tex: 'Alimentadores y circuitos derivados',
      tip: 'O',
      cri: 'Cuentan todos los alimentadores y circuitos derivados con su protección contra sobrecorriente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 48,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 49,
      nom: '250-24',
      tex: 'Puesta a tierra de sistemas de corriente alterna alimentados por una acometida',
      tip: 'O',
      cri: 'Se tiene un conductor de puesta a tierra conectado al conductor puesto a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 50,
      nom: '250-28',
      tex: 'Puente unión principal y puente de unión del sistema',
      tip: 'O',
      cri: 'Son de material resistente a la corrosión, barra, conductor o tornillo, tamaño acorde a la tabla 250-66',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 51,
      nom: '250-80 250-92',
      tex: 'Canalizaciones y envolventes de acometida. Unión de equipos de acometidas',
      tip: 'O',
      cri: 'Las partes metálicas no conductoras están conectadas a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 52,
      nom: '250-50',
      tex: 'Sistema de electrodos de puesta a tierra',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La tubería de agua y estructura metálica del edificio son electrodos y electrodos prefabricados pueden usarse en el sistema de electrodos y deben interconectarse entre si, los diferentes sistemas de tierra deben conectarse entre si',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 53,
      nom: '250-53',
      tex: 'Instalación del sistema de electrodo de puesta a tierra',
      tip: 'O',
      cri: 'Existen electrodos especialmente construidos, como: varilla, tubería de agua, placas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 54,
      nom: '250-66',
      tex: 'Tamaño del conductor del electrodo de puesta atierra de corriente alterna',
      tip: 'O, D',
      cri: 'Se especificó de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 55,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 56,
      nom: '250-64',
      tex: 'Instalación del conductor del electrodo de puesta a tierra.',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores de puesta a tierra están firmemente sujetos, protegidos y asegurados contra daño físico, son eléctricamente continuos y están conectados con materiales aprobados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 57,
      nom: '250-68',
      tex: 'Conexión del conductor del electrodo de puesta a tierra y del puente de unión',
      tip: 'O',
      cri: 'Las conexiones a los electrodos están accesibles y aseguran una puesta a tierra eficaz. Existen puentes de unión',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 58,
      nom: '250-70',
      tex: 'Métodos de conexión del conductor de puesta a tierra y de unión a los electrodos',
      tip: 'O',
      cri: 'La conexión esta hecha con soldadura exotérmica, zapatas, conectores a presión, abrazaderas u otros medios aprobados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 59,
      nom: '250-52',
      tex: 'Electrodos de puesta a tierra',
      tip: 'O',
      cri: 'La tubería metálica de agua y las armazones estructurales están conectadas equipotencialmente',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 60,
      nom: '250-168',
      tex: 'Puente de unión del sistema corriente continua',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Existe un puente de unión principal, sin empalmes, que conecta al conductor de puesta a tierra de equipo y el envolvente del medio de desconexión de la acometida al conductor puesto a tierra del sistema',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 61,
      nom: '250-92 b) 250-102',
      tex: 'Método de unión en la acometida Conductores y puente del equipo',
      tip: 'O',
      cri: 'Las canalizaciones y gabinetes del equipo de acometida están conectados equipotencialmente en forma correcta.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 62,
      nom: '250-28 d) 1) 250-24 c)',
      // tslint:disable-next-line: max-line-length
      tex: 'Puente de unión principal y puente de unión del sistema. Tamaño nominal. Conductor puesto a tierra llevado al equipo de acometida',
      tip: 'O',
      cri: 'Verificar que el calibre del conductor de puesta a tierra del electrodo, en la acometida este de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 63,
      nom: '250-30',
      tex: 'Pues a tierra de sistemas de CA derivados separados',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Revisar que los sistemas derivados independientemente tengan electrodos de puesta a tierra, conductores de electrodos de puesta a tierra y puentes de conexión equipotencial adecuados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 64,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de equipos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 65,
      nom: '250-118',
      tex: 'Tipos de conductores de puesta a tierra de equipos',
      tip: 'O',
      cri: 'Cobre o aluminio, tubo conduit metálico, en c/derivado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 66,
      nom: '250-146',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja',
      tip: 'O',
      cri: 'Verificar que la terminal de puesta a tierra del contacto este conectada a la caja metálica',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 67,
      nom: '250-96 250-28 348-60 350-60',
      // tslint:disable-next-line: max-line-length
      tex: 'Unión con otras envolventes. Puente de unión principal y del puente de unión del sistema. Tubo conduit metálico flexible Puesta a tierra y unión. Tubo conduit flexible metálico y no metálico',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Verificar que las partes metálicas no conductoras estén conectadas a tierra con accesorios adecuados y aprobados, que los cables de puesta a tierra del electrodo y del equipo sean de cobre y de acuerdo a las tablas 250-66 y 250-122',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 68,
      nom: '408-40',
      tex: 'Puesta a tierra de los tableros de alumbrado y control',
      tip: 'O',
      cri: 'Los tableros de alumbrado y control están conectados a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 69,
      nom: '250-142',
      tex: 'Uso del conductor de puesto a tierra del circuito para puesta a tierra de equipos',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Lado suministro: se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra Lado de la carga: no se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 70,
      nom: '250-146 406-3 d)',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja Contactos con puesta a tierra aislada',
      tip: '',
      cri: 'Los contactos de tierra aislada están identificados con un triángulo naranja y los conductores de puesta a tierra son aislados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 71,
      nom: '',
      tex: '300 Métodos de Alambrado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 72,
      nom: '300-3 a), b) y c) 1) 2)',
      tex: 'Conductores',
      tip: 'O',
      cri: 'Los conductores, individuales, del mismo circuito y de menos de 600 V, están instalados en canalizaciones metálicas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 73,
      nom: '300-4',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los conductores están separados de los bordes de las canalizaciones metálicas y están protegidos contra tornillos y clavos',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 74,
      nom: '300-4 g)',
      tex: 'Accesorios aislados',
      tip: 'O',
      cri: 'Las boquillas de las canalizaciones tienen una superficie lisa y redondeada',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 75,
      nom: '300-3 2)',
      tex: 'Conductores de puesta a tierra y de unión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Se permitirá que los conductores de puesta atierra de equipos estén instalados afuera de la canalización o del ensamble de cable, si están de acuerdo con las disposiciones de 250-130 c)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 76,
      nom: '300-10',
      tex: 'Continuidad eléctrica de las canalizaciones y envolventes metálicas',
      tip: 'O',
      cri: 'Las canalizaciones, cajas y gabinetes metálicos están unidos mecánicamente y tienen continuidad eléctrica',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 77,
      nom: '300-11',
      tex: 'Aseguramiento y soportes.',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las canalizaciones, cajas, gabinetes, cables y accesorios están firmemente sujetos y soportadas en su lugar , no se usan como medios de soporte',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 78,
      nom: '300-13',
      tex: 'Continuidad mecánica y eléctrica de los conductores',
      tip: 'O',
      cri: 'Los conductores son continuos entre las cajas, registros y gabinetes, no existen empalmes',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 79,
      nom: '300-14',
      tex: 'Longitud de los conductores libres en las salidas',
      tip: 'O',
      cri: 'Existen 15 cm de longitud adicional en las cajas y puntos de conexión',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 80,
      nom: '300-15',
      tex: 'Cajas o accesorios, cuando se requieren',
      tip: 'O',
      cri: 'Están instaladas cajas en los puntos de conexión, empalme, salida y alambrado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 81,
      nom: '300-17',
      tex: 'Número y tamaño de los conductores en una canalización',
      tip: 'O',
      cri: 'La ocupación de los conductores en las canalizaciones, es la correcta',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 82,
      nom: '300-18',
      tex: 'Instalación de canalizaciones',
      tip: 'O',
      cri: 'Las canalizaciones están instaladas de manera completa, antes de cablear',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 83,
      nom: '300-21',
      tex: 'Propagación de fuego o de productos de la combustión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las aberturas alrededor de los elementos eléctricos que pasan a través de paredes, pisos o techos resistentes al fuego están protegidas contra el fuego por métodos adecuados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 84,
      nom: '',
      tex: '392 Charolas Portacables',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 85,
      nom: '392-18',
      tex: 'Instalación de charolas portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El sistema esta instalado de manera completa, no están instalados cables de mas de 600 v con otros de menor voltaje, están separadas 60 cm de otras tuberías de servicios',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 86,
      nom: '392-60',
      tex: 'Puesta a tierra y Unión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Está provista de un conductor de puesta a tierra en toda la longitud de la charola y este esta conectado a la misma cada 15 m con un accesorio compatible con el material de la charola',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 87,
      nom: '392-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los empalmes no sobresalen los rieles laterales; los cables o sus conjuntos están fijos firmemente, los cables del 4 al 4/0 están colocados en una sola capa;',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 88,
      nom: '392-22',
      tex: 'Número de cables multiconductores de 2000 v nominales o menos en soportes tipo charola portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La suma de los diámetros de todos los cables no supera el ancho de la charola para cables de 4/0 o mayores; para cables menores a 4/0 la suma de las áreas no debe superar la superficie máxima permisible en la tabla 318-9. Ver las demás condiciones',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 89,
      nom: '392-22 a)',
      tex: 'Número de cables monoconductores ≤ 2000 V',
      tip: 'O',
      cri: 'Se acepta si están uniformemente distribuidos a lo ancho y hay espacio entre ellos, ver tabla 392-22 a)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 90,
      nom: '392-22 c)',
      tex: 'Número de cables de media tensión y tipo MC de (más de 2000 volts) en charolas portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Cables mono-conductores en grupos de tres, cuatro están instalados en una sola capa y la suma de los diámetros de los cables agrupados no exceden el ancho de la charola',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 91,
      nom: '',
      tex: '358 Tubo conduit metáico ligero tipo EMT',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 92,
      nom: '358-10',
      tex: 'Usos permitidos',
      tip: 'O',
      cri: 'Se utiliza en instalaciones interiores ocultas y expuestas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 93,
      nom: '358-20',
      tex: 'Tamaño',
      tip: 'O',
      cri: 'Diámetro: Mínimo 16 mm (1/2”), Máximo 103 mm (4”)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 94,
      nom: '358-22',
      tex: 'Número de conductores',
      tip: '',
      cri: 'La ocupación de los conductores de acuerdo a la tabla 1, capitulo 10',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 95,
      nom: '358-28 358-42',
      tex: 'Desbastado y roscado Coples y conectores',
      tip: 'O',
      cri: 'El tubo instalado no está roscado, no hay bordes en sus extremos, los acoplamientos y accesorios están firmemente sujetos',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 96,
      nom: '358-24 358-26',
      tex: 'Dobleces Número de curvas',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'En las curvas el tubo no ha sufrido daños. El radio de curvatura esta hecho de acuerdo a la tabla 2 capitulo 10. No existen mas de 4 dobleces de un cuadrante de (360ª en total)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 97,
      nom: '358-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      cri: 'Está sujeto firmemente por menos cada tres metros y no mayor de 90 cm de cada caja de salida',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 98,
      nom: '',
      tex: '314 Cajas, cajas de paso y sus accesorios, utilizados para salida, empalme, unión o jalado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 99,
      nom: '314-4',
      tex: 'Cajas metálicas',
      tip: 'O',
      cri: 'Las cajas metálicas están puestas a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 100,
      nom: '314-16',
      tex: 'Número de conductores en las cajas de salida, de dispositivos y de unión y en las cajas de paso',
      tip: 'O',
      cri: 'Existe suficiente espacio para los conductores en las cajas y condulets',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 101,
      nom: '314-17 314-17 a)',
      tex: 'Conductores que entran en cajas, cajas de paso o accesorios',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión. Las aberturas no utilizadas están cerradas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 102,
      nom: '314-20',
      tex: 'En la pared o el plafón',
      tip: 'O',
      cri: 'Las cajas instaladas en paredes o los plafones no quede a más de 6 mm dentro de la superficie terminada',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 103,
      nom: '314-21',
      tex: 'Reparación de superficies incombustibles',
      tip: 'O',
      cri: 'No existen espacios ni separaciones mayores que 3 mm en el borde de la caja.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 104,
      nom: '314-23',
      tex: 'Soportes',
      tip: 'O',
      cri: 'Las cajas están sostenidas firmemente, los cables están seguros y los accesorios de soporte son galvanizados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 105,
      nom: '314-24',
      tex: 'Profundidad de las cajas de salida',
      tip: 'O',
      cri: 'La profundidad mínima en las cajas instaladas es de 12.7 mm',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 106,
      nom: '314-27',
      tex: 'Cajas de salida para: alumbrado, piso y ventiladores de techo',
      tip: 'O',
      cri: 'Las cajas de salida para lámparas son las adecuadas y están certificadas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 107,
      nom: '314-29',
      tex: 'Cajas y registros que deben ser accesibles',
      tip: 'O',
      cri: 'Las cajas están accesibles',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 108,
      nom: '314-30',
      tex: 'Registros',
      tip: 'O',
      cri: 'Los registros se deben diseñar e instalar para que resistan todas las cargas que probablemente se impongan sobre ellos',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 109,
      nom: '314-40',
      tex: 'Cajas, cajas metálicas y accesorios',
      tip: 'O',
      cri: 'Las cajas son galvanizadas y de un espesor mínimo de 1.6 mm, están conectadas a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 110,
      nom: '',
      tex: '312 Gabinetes, cajas de desconexión y bases para medidores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 111,
      nom: '312-3',
      tex: 'Posición en las paredes',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El borde no está metido mas de 6.35 mm por debajo de la superficie, los gabinetes instalados están a nivel de la superficie, o sobresalen de la misma',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 112,
      nom: '312-4',
      tex: 'Reparación de las superficies no combustibles',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las superficeis no combustibles que estén dañadas o incompletas se deben reparar para que no queden espacios abiertos ni separaciones mayores a 3 mm en el borde del gabinete o la caja de desconexión.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 113,
      nom: '312-5',
      tex: 'Conductores que entren en ,los gabinetes o cajas para corta circuitos',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión y están firmemente sujetos al gabinete',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 114,
      nom: '312-6 312-7',
      tex: 'Radio de curvatura de los conductores',
      tip: 'O',
      cri: 'Existe suficiente espacio para el alambrado y doblado de los cables',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 115,
      nom: '312-8',
      // tslint:disable-next-line: max-line-length
      tex: 'Envolventes para interruptores y dispositivos de protección contra sobrecorriente con empalmes, derivaciones y conductores de paso de alimentación',
      tip: 'O',
      cri: 'No se utilizan como cajas de empalme',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 116,
      nom: '',
      tex: '404 Des-conectadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 117,
      nom: '404-2 404-12',
      tex: 'Conexión de los des-conectadores Conexión a tierra',
      tip: 'O',
      cri: 'Las conexiones están hechas en los conductores de fase. Los gabinetes están conectados a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 118,
      nom: '',
      tex: '406 Contactos, Conectores de Cordón y Clavijas de Conexión.',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 119,
      nom: '406-4 a)',
      tex: 'De tipo de puesta a tierra',
      tip: 'O',
      cri: 'Los contactos que están instalados en circuitos derivados de 15y 20 Amperes son de tipo puesta a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 120,
      nom: '406-4 b)',
      tex: 'Puestos a tierra',
      tip: 'O',
      cri: 'Los contactos cuentan con un conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 121,
      nom: '406-5',
      tex: 'Montaje del contacto',
      tip: 'O',
      cri: 'Los contactos están firmemente en su lugar que les corresponde.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 122,
      nom: '406-9',
      tex: 'Contactos en lugares húmedos o mojados',
      tip: 'O',
      cri: 'El contacto exterior está protegido a prueba de intemperie',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 123,
      nom: '406-11',
      tex: 'Conexión de la terminal de puesta a tierra del contacto de la caja',
      tip: 'O',
      cri: 'La conexión de la terminal cumple con el 250-146',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 124,
      nom: '',
      tex: '408 Tableros de distribución y tableros de alumbrado y control',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 125,
      nom: '408-3 408-3 a) 1)',
      tex: 'Soportes e instalación de las barras colectoras y de los conductores Ubicación',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'No están sujetos a daño físico. No hay sobre-calentamiento. Tienen puente de unión. Las terminales son accesibles. Las fases están arregladas ABC del frente hacia atrás, de arriba hacia abajo o de izquierda a derecha. Hay suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 126,
      nom: '408-4 a)',
      tex: 'Directorio de circuitos o identificación de circuito',
      tip: 'O',
      cri: 'Cada circuito o modificación de circuito debe ser identificado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 127,
      nom: '408-20',
      tex: 'Ubicación de los tableros de distribución',
      tip: 'O',
      cri: 'Están ubicados en lugares permanentemente secos solo son accesibles a personas calificadas',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 128,
      nom: '408-17',
      tex: 'Ubicación con materiales fácilmente combustibles',
      tip: 'O',
      cri: 'Es un espacio dedicado, no hay probabilidad de que transmitan fuego a materiales combustibles',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 129,
      nom: '408-18',
      tex: 'Separaciones',
      tip: 'O',
      cri: 'El tablero esta separado 90 cm del techo combustible, existe espacio de trabajo suficiente alrededor del tablero',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 130,
      nom: '408-19',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Los cables dentro del tablero están aprobados y listados, son resistentes a la propagación de la flama',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 131,
      nom: '408-5',
      tex: 'Distancia para el conductor que entra en el envolvente de la barra conductora',
      tip: 'O',
      cri: 'Existe espacio suficiente que permite la instalación de los conductores en dichos envolventes, de acuerdo as la tabla 408-5',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 132,
      nom: '408-30 408-36',
      tex: 'Tableros de alumbrado y control, generalidades, protección contra sobre-corriente',
      tip: 'O',
      cri: 'Deben tener parámetros nominales no menores a los mínimos del alimentador. Protegidos individualmente',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 133,
      nom: '408-50 408-51 408-52',
      tex: 'Paneles Barras colectoras Protección de los circuitos de instrumento',
      tip: 'O',
      cri: 'Están hechos de material no combustible Están rígidamente montadas Están protegidos con interruptores de 15 amperes.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 134,
      nom: '408-55',
      tex: 'Espacio de curvatura de alambre dentro de un envolvente que contiene un panel de alumbrado y control',
      tip: 'O',
      cri: 'Cuentan con espacio arriba y abajo para el doblez de los cables, tabla 312-6 a) y b)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 135,
      nom: '',
      tex: '410 Luminarias, portalámparas, lámparas y receptáculos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 136,
      nom: '410-5',
      tex: 'Partes vivas',
      tip: 'O',
      cri: 'Las luminarias están contenidos en una envolvente',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 137,
      nom: '410-20',
      tex: 'Espacio para los conductores',
      tip: 'O',
      cri: 'Existe espacio suficiente para el acomodo de los conductores',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 138,
      nom: '410-21',
      tex: 'Limites de temperatura de los conductores en las cajas de salida',
      tip: 'O',
      cri: 'Las luminarias permiten la ventilación de los cables',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 139,
      nom: '410-24',
      tex: 'Conexión de las luminarias de descarga eléctrica y luminarias LED',
      tip: 'O',
      cri: 'Están conectadas con tubo conduit metálico flexible, las cajas de conexión están accesibles',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 140,
      nom: '410-30',
      tex: 'Soportes de las luminarias',
      tip: 'O',
      cri: 'Están firmemente sujetos al techo con canal, tirantes y cadena metálica',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 141,
      nom: '410-52',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Se utiliza aislamiento THWLS',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 142,
      nom: '410-74',
      tex: 'Capacidad nominal de las luminarias',
      tip: 'O',
      cri: 'Están debidamente identificados',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 143,
      nom: '410-151',
      tex: 'Rieles de iluminación Instalación',
      tip: 'O',
      cri: 'Los rieles de iluminación deben estar instalados y conectados en forma permanente a un circuito derivado',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 144,
      nom: '410-154',
      tex: 'Sujeción',
      tip: 'O',
      cri: 'Los rieles de iluminación se deben sujetar y asegurar , de modo que cada sujeción sea adecuada',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 145,
      nom: '',
      tex: '430 Motores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 146,
      nom: '430-6',
      tex: 'Determinación de la ampacidad y del valor nominal de los motores',
      tip: 'O',
      cri: 'Los conductores están seleccionados con las tablas 430-247 al 430-250; interruptores con la tabla 430-52. Los elementos térmicos se seleccionan con la corriente de placa.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 147,
      nom: '430-7 430-8',
      tex: 'Marcado de motores y equipo con varios motores. Marcado en los controladores',
      tip: 'O',
      cri: 'Existe una placa de datos en la carcasa del motor. Existe una placa de datos en el gabinete de control. ',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 148,
      nom: '430-9',
      tex: 'Terminales',
      tip: 'O',
      cri: 'Las terminales están identificadas por dígitos o colores, los conductores son de cobre, no existen falsos contactos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 149,
      nom: '430-10',
      tex: 'Espacio para cableado en los gabinetes',
      tip: 'O',
      cri: 'Los gabinetes no se usan como cajas de conexión. Existe espacio suficiente dentro de los gabinetes de equipo de control para el doblado de cables tabla 430-10(b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 150,
      nom: '430-12',
      tex: 'Cajas para las terminales para los motores ',
      tip: 'O',
      cri: 'Las cajas son metálicas, existe espacio suficiente para el acomodo de las terminales (tabla 430-12 (b) )',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 151,
      nom: '430-14',
      tex: 'Ubicación de los motores',
      tip: 'O',
      cri: 'Los motores esta ventilados y obedecen a un programa de mantenimiento',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 152,
      nom: '430-22 a)',
      tex: 'Un solo motor. ',
      tip: 'O',
      cri: 'La capacidad de corriente de los conductores es del 125% de la corriente de plena carga (tabla 430-247 a 430-250)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 153,
      nom: '430-24',
      tex: 'Varios motores o motor(es) y otras (s) cargas(s)',
      tip: 'O',
      cri: 'Los conductores tienen capacidades de corriente iguales a la suma de las corrientes de plena carga de los aparatos más la corriente de plena carga de los motores ( 430-247 a 430-250) mas el 125% de la del motor mas grande.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 154,
      nom: '430-31 al 430-44',
      tex: 'Protección de sobrecarga de los motores y de sus circuitos derivados',
      tip: 'O',
      cri: 'La protección contra sobrecarga del motor no excede los valores permitidos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 155,
      nom: '430-51 al 430-58',
      tex: 'Protección de circuitos derivados para motores contra cortocircuito y fallas a tierra',
      tip: 'O',
      cri: 'La protección contra falla a tierra y corto circuito del circuito derivado del motor no excede los valores permitidos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 156,
      nom: '430-61 al 430-63',
      tex: 'Protección de los alimentadores de motores contra cortocircuito y fallas a tierra',
      tip: 'O',
      cri: 'La protección contra falla a tierra y corto circuito del alimentador del motor no excede los valores permitidos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 157,
      nom: '430-71 al 430-75',
      tex: 'Circuitos de control de motores',
      tip: 'O',
      cri: 'La protección contra sobre corriente no excede los valores permitidos y la protección de los conductores no excede los valores especificados en la columna A de la Tabla 430-72 (b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 158,
      nom: '430-81 al 430-90',
      tex: 'Controladores de motores',
      tip: 'O',
      cri: 'Los controladores son del tipo apropiado y posean las capacidades nominales y la envolvente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 159,
      nom: '430-92 al 430-98',
      tex: 'Centro de control de motores',
      tip: 'O',
      cri: 'La protección contra sobre corriente no excede las capacidades nominales apropiadas. El arreglo de fases es apropiado. Los espacios mínimos para cableados son adecuados (tabla 430-97).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 160,
      nom: '430-101 al 430-113 110-26 110-34',
      tex: 'Medios de desconexión',
      tip: 'O',
      cri: 'Las capacidades nominales de los medios de desconexión y protección son los adecuados. El espacio de trabajo y el espacio dedicado son los adecuados. Los medios de desconexión están a la vista y son fácilmente accesibles.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 161,
      nom: '430-221 al 430-227',
      tex: 'Motores que operan a más de 600 V nominales',
      tip: 'O',
      cri: 'Los controles están identificados. Las canalizaciones son metálicas. Los conductores son del calibre adecuado. Está protegido contra CC, falla a tierra y sobre carga. Los controladores son del tamaño adecuado. El medio de desconexión tiene bloqueo mecánico.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 162,
      nom: '430-231 al 430-233',
      tex: 'Protección de las partes vivas para todas las tensiones eléctricas',
      tip: 'O',
      cri: 'Las partes vivas están protegidas mediante un envolvente. Existen tarimas aislantes frente al equipo eléctrico.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 163,
      nom: '430-241 al 430-245',
      tex: 'Puesta a tierra para todas las tensiones eléctricas',
      tip: 'O',
      cri: 'Todas las partes metálicas no conductoras de energía eléctrica están conectadas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 164,
      nom: '',
      tex: '440 Equipos de aire acondicionado y de refrigeración',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 165,
      nom: '440-1 al 440-3',
      tex: 'Disposiciones generales',
      tip: 'O',
      cri: 'Están identificados los equipos sujetos a este articulo.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 166,
      nom: '440 – 4 a) b) c)',
      tex: 'Placa de datos de moto-compresores herméticos de refrigeración y equipos',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La unidad cuenta con una placa de datos que identifica las características eléctricas del motor. Existe una protección contra corto circuito y sobrecarga. La capacidad del circuito derivado se selección con la corriente eléctrica de carga nominal de placa',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 167,
      nom: '440-12 a)',
      tex: 'Medios de desconexión. Capacidad nominal y capacidad de interrupción. Moto-compresor hermético de refrigeración',
      tip: 'O, A',
      // tslint:disable-next-line: max-line-length
      cri: 'El tamaño del controlador fue seleccionado en función de la corriente eléctrica del rotor bloqueado. Tablas 430-251A o 430-251B',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 168,
      nom: '440-21 al 440-22',
      tex: 'Protección de los circuitos derivados contra cortocircuito y falla a tierra. Requisitos generales. Aplicación y selección',
      tip: 'O, A',
      // tslint:disable-next-line: max-line-length
      cri: 'Están establecidos los requisitos para los dispositivos de protección contra sobre-corrientes debidas a corto circuito y falla a tierra. Soportan la corriente de arranque del motor y tiene un ajuste no mayor al 175% de la corriente eléctrica nominal',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 169,
      nom: '440-31 al 440-35',
      tex: 'Conductores del circuito derivado',
      tip: 'O',
      cri: 'El calibre de los conductores es adecuado y se basa en la información aplicable de la placa de datos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 170,
      nom: '440-41',
      tex: 'Controladores para motores de compresor. Capacidad nominal',
      tip: 'O',
      cri: 'Los controladores tienen las capacidades nominales adecuadas. (datos de placa)',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 171,
      nom: '440-60 al 440-65',
      tex: 'Requisitos para acondicionadores de aire para habitación',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores, toma corrientes, cordones y dispositivos de sobre-corriente para acondicionadores de aire de habitación están dimensionados apropiadamente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 172,
      nom: '',
      tex: '450 Transformadores y bóvedas para transformadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 173,
      nom: '450-1, 450-2',
      tex: 'Alcance y definición ',
      tip: 'O',
      cri: 'Están identificados los transformadores tratados en este articulo.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 174,
      nom: '450-3',
      tex: 'Protección contra sobre-corriente. Instalaciones supervisadas a) Primario y secundario. Instalaciones supervisadas Transformadores de tensión eléctrica mayor a 600 V. ',
      tip: 'O',
      cri: 'Se cuenta con protección contra sobre-corriente para los transformadores de más de 600 Volts, de acuerdo a la tabla 450-3 a),450-3 b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 175,
      nom: '450-6',
      tex: 'Enlace del secundario',
      tip: 'O',
      cri: 'Debe contar con protección en los términos de esta sección.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 176,
      nom: '450-7',
      tex: 'Funcionamiento en paralelo',
      tip: 'O',
      cri: 'La protección de cada TR debe cumplir con 450-3 a) ó 450-3 b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 177,
      nom: '450-8',
      tex: 'Resguardo',
      tip: 'O',
      cri: 'Se acepta cuando tengan protección mecánica y no tengan partes vivas expuestas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 178,
      nom: '450-9',
      tex: 'Ventilación',
      tip: 'O',
      cri: 'La ventilación se considera correcta cuando sin provocar aumentos de temperatura mayor a la nominal del TR.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 179,
      nom: '450-10',
      tex: 'Puesta a tierra',
      tip: 'O',
      cri: 'El tanque del TR está conectado a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 180,
      nom: '450-11',
      tex: 'Marcado',
      tip: 'O',
      cri: 'Tiene una placa con las características técnicas del TR.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 181,
      nom: '450-12',
      tex: 'Espacio para el alambrado de las terminales',
      tip: 'O',
      cri: 'Tiene espacio suficiente para permitir los radios de curvatura de los cables, ver 312-6, tabla 314-16 b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 182,
      nom: '450-13',
      tex: 'Accesibilidad',
      tip: 'O',
      cri: 'El acceso es fácil para el personal calificado de inspección y mantenimiento 450-13 a) ó 450-13 b).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 183,
      nom: '450-21',
      tex: 'TR tipo seco instalados en interiores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 184,
      nom: '',
      tex: '< 112.5 KVA',
      tip: 'O',
      cri: 'Están instalados a no menos de 30 cm de materiales combustibles.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 185,
      nom: '',
      tex: '> 112.5 KVA',
      tip: 'O',
      cri: 'Están instalados en un cuarto resistente al fuego.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 186,
      nom: '',
      tex: '> 35000 VOLTS',
      tip: 'O',
      cri: 'Están instalados en una bóveda.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 187,
      nom: '450-22',
      tex: 'TR secos instalados en exteriores',
      tip: '',
      cri: 'Tienen un envolvente a prueba de intemperie.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 188,
      nom: '450-23',
      tex: 'TR aislados con líquidos de baja inflamabilidad',
      tip: 'O',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 189,
      nom: '',
      tex: 'Instalaciones interiores',
      tip: 'O',
      cri: 'Los TR instalados son < 35KV, no hay materiales combustibles, se tiene un área de confinamiento del líquido.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 190,
      nom: '',
      tex: '',
      tip: '',
      cri: 'El área cumple las restricciones en la aprobación del liquido.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 191,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Se tiene un sistema automático de extinguidores, 450-26.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 192,
      nom: '',
      tex: 'Instalaciones exteriores',
      tip: 'O',
      cri: 'La instalación cumple con las restricciones aprobadas para el líquido,, 450-27.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 193,
      nom: '450-24',
      tex: 'TR aislados con líquidos no inflamables',
      tip: 'O',
      cri: 'Están instalados en bóvedas y tienen un área para confinar el liquido, el TR cuenta con una válvula de alivio.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 194,
      nom: '450-25',
      tex: 'TR aislados con Askarel',
      tip: 'O',
      cri: 'No se permite.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 195,
      nom: '450-26',
      tex: 'TR aislados con aceite instalados en interiores',
      tip: 'O',
      cri: 'Están instalados en una bóveda, ver parte C de 450.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 196,
      nom: '450-27',
      tex: 'TR con aislamiento de aceite instalados en exteriores',
      tip: 'O',
      cri: 'Las construcciones aledañas son resistentes al fuego, hay espacio suficiente para aislar el fuego, barreras separadoras  resistentes al fuego, sistemas rociadores automáticos, espacios para confinar el aceite.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 197,
      nom: '450-28',
      tex: 'Modificaciones a los transformadores',
      tip: 'O',
      cri: 'El TR tiene una placa con sus nuevas características.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 198,
      nom: '450-41',
      tex: 'Ubicación (bóvedas)',
      tip: 'O',
      cri: 'Cuentan con ventilación al aire exterior, natural o forzada.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 199,
      nom: '450-42',
      tex: 'Paredes, techos y pisos',
      tip: 'O',
      cri: 'Están construidos con resistencia estructural acorde al peso del TR y resistente al fuego por tres horas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 200,
      nom: '450-43',
      tex: 'Entradas',
      tip: 'O',
      cri: 'La puerta es de cierre hermético resistente al fuego, tiene un murete de 10 cm de altura para contener el aceite y permanece cerrada.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 201,
      nom: '',
      tex: '924 Subestaciones',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 202,
      nom: '924-2 a), b)',
      tex: 'Medio de desconexión general',
      tip: 'O',
      cri: 'Tienen un medio de desconexión entre el suministro y el transformador.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 203,
      nom: '924-3',
      tex: 'Resguardos de locales y espacios',
      tip: 'O',
      cri: 'El espacio está restringido y resguardado su acceso, deben tener una altura mínima de 2.10 m y deben cumplir con el 110-34.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 204,
      nom: '924-4 a) al e)',
      tex: 'Condiciones de los locales y espacios',
      tip: 'O',
      cri: 'Están hechos de materiales no combustibles, no se emplean como almacén o taller, están libres de materiales combustibles, están ventilados y acceso restringido.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 205,
      nom: '924-5',
      tex: 'Instalación de alumbrado',
      tip: 'O',
      cri: 'Existen un alumbrado y permite los trabajos de mantenimiento y segura para el personal que lo realice, el alumbrado está conectado a una planta de emergencia (tabla 924-5).',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 206,
      nom: '924-6',
      tex: 'Piso, barreras y escaleras',
      tip: 'O',
      cri: 'Los pisos son planos, firmes y con superficie antiderrapante, los huecos y trincheras están tapados, las escaleras tienen pasamanos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 207,
      nom: '924-7',
      tex: 'Accesos y Salidas',
      tip: 'O',
      cri: 'El acceso y salida están libres de obstáculos, las puertas abren hacia afuera, en la puerta está un letrero de advertencia con le leyenda “PELIGRO ALTA TENSIÓN”.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 208,
      nom: '924-8',
      tex: 'Protección contra incendio',
      tip: 'O',
      cri: 'Existen extintores y medio para confinar recoger y almacenar el aceite que puede fugarse de los tanques, cuando los transformadores se enfriados por aceite existen barreras que limitan la propagación del fuego.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 209,
      nom: '924-9',
      tex: 'Localización y accesibilidad de tableros',
      tip: 'O',
      cri: 'Los tableros son accesibles y con el espacio suficiente para operación y mantenimiento seguros, no hay materiales combustibles cercanos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 210,
      nom: '924-10',
      tex: 'Dispositivo general de protección contra sobrecorriente',
      tip: 'O',
      cri: 'Existe en el primario un interruptor de fusibles.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 211,
      nom: '924-11',
      tex: 'Requisitos generales del sistema de protección del usuario',
      tip: 'O',
      cri: 'La subestación tiene su propio medio de protección.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 212,
      nom: '924-12',
      tex: 'Equipo a la intemperie o en lugares húmedos',
      tip: 'O',
      cri: 'El equipo está diseñado para operar en intemperie.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 213,
      nom: '924-13',
      tex: 'Consideraciones ambientales',
      tip: 'O',
      cri: 'Los equipos soportan los esfuerzos sísmicos y limitan el ruido a 60 dB.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 214,
      nom: '924-14',
      tex: 'Instalación y mantenimiento del equipo eléctrico',
      tip: 'O,D',
      cri: 'No hay partes maltratadas o rotas del equipo, un programa de mantenimiento con su bitácora.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 215,
      nom: '924-15',
      tex: 'Partes con movimientos repentinos',
      tip: 'O',
      cri: 'Las partes en movimiento tienen un resguardo.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 216,
      nom: '924-16',
      tex: 'Identificación de equipo eléctrico',
      tip: 'O',
      cri: 'Los equipos están identificados.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 217,
      nom: '924-17',
      tex: 'Transformadores de corriente.',
      tip: 'O',
      cri: 'Tienen un medio para ponerse en corto circuito y conectarse a tierra simultáneamente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 218,
      nom: '924-18',
      tex: 'Protección de los circuitos secundarios de Transformadores para instrumentos',
      tip: 'O',
      cri: 'Están equipados con unos conectores adecuados.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 219,
      nom: '924-19',
      tex: 'Instalación de transformadores de potencia y distribución',
      tip: 'O',
      cri: 'Los tr tienen su medio de desconexión, existe un contendor de aceite y están instalados en una bóveda, trabajan al 80% de su capacidad.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 220,
      nom: '924-20',
      tex: 'Medio aislante',
      tip: 'O',
      cri: 'Los líquidos aislantes son biodegradables.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 221,
      nom: '924-23',
      tex: 'Puesta a tierra',
      tip: 'O',
      cri: 'Las partes metálicas no conductoras están conectadas a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 222,
      nom: '924-24',
      tex: 'Tarimas y tapetes aislantes',
      tip: 'O',
      cri: 'Existen tarimas y tapetes enfrente a los tableros.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 223,
      nom: '',
      tex: '445 Generadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 224,
      nom: '445-10',
      tex: 'Ubicación',
      tip: 'O',
      cri: 'Los generadores están montados en un local dedicado.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 225,
      nom: '445-11',
      tex: 'Marcado',
      tip: 'O',
      cri: 'Los generadores tienen una placa de datos con sus características técnicas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 226,
      nom: '445-12',
      tex: 'Protección contra sobrecorriente',
      tip: 'O',
      cri: 'Los generadores tienen un interruptor para protección contra sobre carga.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 227,
      nom: '445-13',
      tex: 'Ampacidad de los conductores',
      tip: 'O,D',
      cri: 'La ampacidad de los conductores es el 115% de la corriente de placa del generador, el neutro cumple con lo indicado en la sección 220-61.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 228,
      nom: '445-14',
      tex: 'Protección de las partes vivas',
      tip: 'O',
      cri: 'Las partes vivas están resguardadas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 229,
      nom: '445-15',
      tex: 'Protección para los operadores',
      tip: 'O',
      cri: 'Las partes que el operador maneje están resguardadas se deben cumplir los requisitos 430-233.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 230,
      nom: '445-16',
      tex: 'Pasa cables',
      tip: 'O',
      cri: 'En donde aplique los conductores están protegidos por un pasa cable.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 231,
      nom: '',
      tex: 'ARTICULO 690 SISTEMAS SOLARES FOTOVOLTAICOS',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 232,
      nom: '',
      tex: 'A. DISPOSICIONES GENERALES',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 233,
      nom: '690-4',
      tex: 'Identificación',
      tip: 'O,D',
      cri: 'Los circuitos de las fuentes FV y los circuitos FTV de salida no están instalados en la misma canalización.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 234,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Los conductores del SFV y del inversor están identificados.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 235,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Los conductores de SFT diferentes están agrupados.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 236,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Las conexiones de los paneles están organizadas de manera que al quitar un módulo no se pierde la continuidad de ningún conductor puesto a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 237,
      nom: '',
      tex: '',
      tip: '',
      cri: 'El alambrado está hecho por personal calificado.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 238,
      nom: '',
      tex: '',
      tip: '',
      cri: 'La trayectoria de los circuitos está a la vista.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 239,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Los medios de desconexión del SFTV en cada inversor están identificados.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 240,
      nom: '',
      tex: '',
      tip: '',
      cri: 'El dispositivo de protección detecta falas a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 241,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Los circuitos con falla se desconectan automáticamente y el inversor suspende la alimentación a los circuitos de salida.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 242,
      nom: '',
      tex: '',
      tip: '',
      cri: 'El inversor cuenta con un letreo de advertencia "Peligro de descarga eléctrica, si se indica una falla a tierra, los conductores normalmente puestos a tierra pueden estar energizados y no puestos a tierra".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 243,
      nom: '690-7',
      tex: 'Tensión máxima',
      tip: 'O,D',
      cri: 'En SFV se anota la tensión máxima 600 V. Tabla 690-7, Para ˃ 600 V, ver 690 parte I y articulo 490.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 244,
      nom: '',
      tex: '',
      tip: '',
      cri: 'En circuitos de SFV se tiene el letrero de advertencia "Arreglo fotovoltaico bipolar, la desconexión de los conductores del nuetro o los puestos a tierra pueden ocasionar una sobre tensión en el arreglo o en el inversor".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 245,
      nom: '690-8',
      tex: 'Dimensionamiento y corriente de los circuitos',
      tip: 'O,D',
      cri: 'La corriente máxima se cálculo en base a esta sección.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 246,
      nom: '',
      tex: '',
      tip: '',
      cri: 'La ampacidad y valor nominal de las protecciones se seleccionó de acuerdo a esta sección.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 247,
      nom: '690-9',
      tex: 'Protección contra sobre-corriente',
      tip: 'O,D',
      cri: 'Los circuitos de salida FV y del inversor están protegidos contra sobre corriente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 248,
      nom: '',
      tex: '',
      tip: '',
      cri: 'El TR de potencia está protegido contra sobre corriente ver 450-3.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 249,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Los dispositivos de protección utilizados en CC están etiquetados para este uso.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 250,
      nom: '690-10',
      tex: 'Sistemas autónomos',
      tip: 'O,D',
      cri: 'El sistema de alambrado es adecuado.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 251,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Cuenta con letreo de advertencia "Alimentación individual de 120 V, no conectar circuitos derivados multifamiliares".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 252,
      nom: '',
      tex: '',
      tip: '',
      cri: 'En caso de que haya retroalimentación no se empelan interruptores automáticos que estén marcados "Línea" y "carga".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 253,
      nom: '690-11',
      tex: 'Protección de falla por arco (corriente continua)',
      tip: 'O,D',
      cri: 'Está instalado un interruptor de falla por arco.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 254,
      nom: '690-13',
      tex: 'Medios de desconexión. Todos los conductores',
      tip: 'O,D',
      cri: 'Se tiene un medio de desconexión que des conecta todos los conductores portadores de CC, adecuado y fácilmente accesible, etiquetado para uso en SFV.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 255,
      nom: '690-16',
      tex: 'Fusibles',
      tip: 'O,D',
      cri: 'Se tienen medios de desconexión para desconectar un fusible.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 256,
      nom: '690-17',
      tex: 'Desconectadores o interruptores automáticos',
      tip: 'O,D',
      cri: 'Se cuenta con interruptores automáticos operados manualmente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 257,
      nom: '',
      tex: '',
      tip: '',
      cri: 'Advertencia: "Peligro de descarga Eléctrica, no tocar terminales. Las terminales, tanto en el lado de línea como en el lado de carga, pueden estar energizados en la posición de abierto".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 258,
      nom: '690-31',
      tex: 'Métodos de alambrado. Métodos permitidos',
      tip: 'O,D',
      cri: 'Se utilizan todos los métodos de alambrado.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 259,
      nom: '690-33',
      tex: 'Clavijas o conectores',
      tip: 'O,D',
      cri: 'Son polarizadas y no son intercambiables, protegen a las personas de contactos con partes vivas, el elemento de puesta a tierra es el primero en hacer contacto.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 260,
      nom: '690-34',
      tex: 'Acceso a cajas',
      tip: 'O,D',
      cri: 'Las cajas de conexión están accesibles',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 261,
      nom: '',
      tex: '',
      tip: '',
      cri: 'En cada caja de conexión existe un letrero de advertencia "Peligro de descarga eléctrica, los conductores de corriente continua de este sistema fotovoltaico no están puestos a tierra y pueden estar energizados".',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 262,
      nom: '690-41',
      tex: 'Puesta a tierra',
      tip: 'O,D',
      cri: 'El conductor de un sistema de 2 hilos mayor a 50 V y el conductor de referencia está sólidamente puesto a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 263,
      nom: '690-43',
      tex: 'Equipo con frequerimiento de puesta a tierra',
      tip: 'O,D',
      cri: 'Partes metálicas expuestas no portadoras de corriente están puestos a tierra.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 264,
      nom: '690-45',
      tex: 'Tamaño dcel conductor de puesta a tierra de equipos',
      tip: 'O,D',
      cri: 'Está de acuerdo a la tabla 250-122.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 265,
      nom: '690-47',
      tex: 'Sistema del electrodo de puesta a tierra',
      tip: 'O,D',
      cri: 'En los sistemas de CA cumple con 250.50 hasta 250-60 y 250.64.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 266,
      nom: '',
      tex: '',
      tip: '',
      cri: 'En sistemas de CC el conductor del electrodo está acorde con 250-166, o 250.169 y 250-64.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 267,
      nom: '690-48',
      tex: 'Continuidad del sistema de puesta a tierra de equipos',
      tip: 'O,D',
      cri: 'Al retiro de un equipo, se instala un puente de unión para mantener la continuidad.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 268,
      nom: '690-51',
      tex: 'Marcado',
      tip: 'O,D',
      cri: 'Los módulos están marcados con la polaridad y una placa con las características técnicas.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 269,
      nom: '690-52',
      tex: 'Módulos FV de CA ',
      tip: 'O,D',
      cri: 'Están marcados con identificación de las puntas y la placa de datos técnicos.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 270,
      nom: '690-53',
      tex: 'Fuente de potencia FV de CC',
      tip: 'O,D',
      cri: 'En el desconectador está una etiqueta permanente con las características técnicas de la fuente FV.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 271,
      nom: '690-54',
      tex: 'Puntos de interconexión de sistemas interactivos',
      tip: 'O,D',
      cri: 'Todos los puntos de interconexión con otras fuentes están marcadas con la corriente y tensión nominales.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 272,
      nom: '690-55',
      tex: 'Identificación de las fuentes de energía',
      tip: 'O,D',
      cri: 'Los sistemas autónomos cuentan con una placa o directorio permanente.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 273,
      nom: '690-57',
      tex: 'Conexión a otros suministros. Des conectador de carga',
      tip: 'O,D',
      cri: 'Al estar abierto desconecta todas las alimentaciones.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 274,
      nom: '690-61',
      tex: 'Pérdida de potencia en un sistema interactivo',
      tip: 'O,D',
      cri: 'Des energiza automáticamente su salida a la red cuando hay pérdida de tensión.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 275,
      nom: '690-71',
      tex: 'Baterías. Instalación',
      tip: 'O,D',
      cri: 'Se instalan de acuerdo al artículo 480.',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id_: 276,
      nom: '690-80',
      tex: 'Sistemas de tensión superior a 600 Volts',
      tip: 'O,D',
      cri: 'Se cumple con el artículo 490.',
      obp: '',
      obs: '',
      cum: 'si'
    }
  ];
  // public currentD = '';
  // public client = {};

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private readonly offlineOnlineService: OfflineOnlineService
  ) {
    this.registerToEvents(offlineOnlineService);
    this.createDatabase();
  }

 /*  Getft151(key: string) {
    this.f151 = this.db.list('data/' + key + '/ft15', ref =>
      ref.orderByChild('id_').equalTo(1).limitToFirst(1)
    );
    return this.f151;
  }
  Getft152(key: string) {
    this.f152 = this.db.list('data/' + key + '/ft15', ref =>
      ref.orderByChild('id_').equalTo(2).limitToFirst(1)
    );
    return this.f152;
  }
  Getft71(key: string) {
    this.f71 = this.db.list('data/' + key + '/ft07', ref =>
      ref.orderByChild('id_').equalTo(1).limitToFirst(1)
    );
    return this.f71;
  }
  Getft72(key: string) {
    this.f72 = this.db.list('data/' + key + '/ft07', ref =>
      ref.orderByChild('id_').equalTo(2).limitToFirst(1)
    );
    return this.f72;
  }
  Getft811(key: string) {
    this.f811 = this.db.list('data/' + key + '/ft81', ref =>
      ref.orderByChild('id_').equalTo(1).limitToFirst(1)
    );
    return this.f811;
  }
  Getft812(key: string) {
    this.f812 = this.db.list('data/' + key + '/ft81', ref =>
      ref.orderByChild('id_').equalTo(2).limitToFirst(1)
    );
    return this.f812;
  }
  Getft821(key: string) {
    this.f821 = this.db.list('data/' + key + '/ft82', ref =>
      ref.orderByChild('id_').equalTo(1).limitToFirst(1)
    );
    return this.f821;
  }
  Getft822(key: string) {
    this.f822 = this.db.list('data/' + key + '/ft82', ref =>
      ref.orderByChild('id_').equalTo(2).limitToFirst(1)
    );
    return this.f822;
  } */

  AddClient(datos: Datos, costol: string) {
    const f = this.splitDate(datos.fechai);
    // const ff = datos.fechai.split('-');
    datos.dia = f.d;
    datos.mes = f.m;
    datos.anio = f.a;
    datos.date = Date.now();
    datos.costol = costol;
    const nClient = { datos, anio: datos.anio };

    if (!this.offlineOnlineService.isOnline) {  // Offline
      this.addClientOffline(nClient as Client);
    } else {
      this.dataList.push(nClient as Client);  // Online
    }
  }
  splitDate(date: string): any {
    if (date) {
      const dd = date.split('-');
      return {
        d: dd[2],
        m: dd[1],
        a: dd[0].substring(2)
      };
    } else {
      return {
        d: '',
        m: '',
        a: ''
      };
    }
  }

  monthToRoman(mes: string) {
    let m = '';
    switch (mes) {
      case '01': m = 'I'; break;
      case '02': m = 'II'; break;
      case '03': m = 'III'; break;
      case '04': m = 'IV'; break;
      case '05': m = 'V'; break;
      case '06': m = 'VI'; break;
      case '07': m = 'VII'; break;
      case '08': m = 'VIII'; break;
      case '09': m = 'IX'; break;
      case '10': m = 'X'; break;
      case '11': m = 'XI'; break;
      case '12': m = 'XII'; break;
      default: m = ''; break;
    }
    return m;
  }

  addft10() {
    this.GetDataList10().snapshotChanges().subscribe(re => {
      /* this.ft81List = []; */
      re.forEach(item => {
        const surv = item.payload.toJSON();
        // surv['$key'] = item.key;
        // this.ft81List.push(surv as F081);
        this.ft10List.push(surv as F10);
      });
    });
    /* this.f10.forEach(item => {
      // console.log(item);
      this.ft10List.push(item as F10);
    }); */
  }
  /* addft06() {
    this.f06.forEach(it => {
      this.ft06List.push(it as F10);
    });
  } */
  /* addft81(fecha: string, id: number) {
    this.ft81List.push({
      id_: id, fecha: fecha, tipo: 'NOM', desc: 'INS', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: '', filas: 1
    } as F081);
  } */
  /* addft82(fecha: string, id: number) {
    this.ft82List.push({
      id_: id, fecha: fecha, tipo: 'PEC', desc: 'PRO', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: '', filas: 1
    } as F081);
  } */
  /* addft15(fecha: string, id: number) {
    this.ft15List.push(
      {
        id_: id,
        fecha: fecha,
        tipo: 'RTPE',
        name: 'REPORTE TÉCNICO DE PROYECTO ELÉCTRICO',
        cod: 'FT-15',
        rev: 5,
        vigen: '17-Nov-17',
        nomycar: '',
        objeto: '',
        fechad: '',
        fecham: '',
        fechaa: '',
        horai: '',
        horaf: '',
        circuns: '',
        no_conf: '',
        observa: '',
        acciones: '',
        firma: '',
        nom1: '',
        id1: '',
        folio1: '',
        exp1: '',
        direc1: '',
        firma1: '',
        nom2: '',
        id2: '',
        folio2: '',
        exp2: '',
        direc2: '',
        firma2: '',
        nom3: '',
        id3: '',
        folio3: '',
        exp3: '',
        direc3: '',
        firma3: ''
      } as Ft7);
  } */
  /* addft07(fecha: string, id: number) {
    this.ft07List.push(
      {
        id_: id,
        fecha: fecha,
        tipo: 'AECIE',
        name: 'ACTA DE EVALUACIÓN DE LA CONFORMIDAD',
        cod: 'FT-07',
        rev: 3,
        vigen: '05-Dic-14',
        nomycar: '',
        objeto: '',
        fechad: '',
        fecham: '',
        fechaa: '',
        horai: '',
        horaf: '',
        circuns: '',
        no_conf: '',
        observa: '',
        acciones: '',
        firma: '',
        nom1: '',
        id1: '',
        folio1: '',
        exp1: '',
        direc1: '',
        firma1: '',
        nom2: '',
        id2: '',
        folio2: '',
        exp2: '',
        direc2: '',
        firma2: '',
        nom3: '',
        id3: '',
        folio3: '',
        exp3: '',
        direc3: '',
        firma3: ''
      } as Ft7);
  } */
  /* async addft07Offline(key: string, fecha: string, id: number) {
    const ui = UUID.UUID();
    await this.localDb.ft07.add({
      id: ui,
      client: key,
      id_: id,
      fecha: fecha,
      tipo: 'AECIE',
      name: 'ACTA DE EVALUACIÓN DE LA CONFORMIDAD',
      cod: 'FT-07',
      rev: 3,
      vigen: '05-Dic-14',
      nomycar: '',
      objeto: '',
      fechad: '',
      fecham: '',
      fechaa: '',
      horai: '',
      horaf: '',
      circuns: '',
      no_conf: '',
      observa: '',
      acciones: '',
      firma: '',
      nom1: '',
      id1: '',
      folio1: '',
      exp1: '',
      direc1: '',
      firma1: '',
      nom2: '',
      id2: '',
      folio2: '',
      exp2: '',
      direc2: '',
      firma2: '',
      nom3: '',
      id3: '',
      folio3: '',
      exp3: '',
      direc3: '',
      firma3: ''
    }
    );
  } */
  /* async addft15Offline(key: string, fecha: string, id: number) {
    const ui = UUID.UUID();
    await this.localDb.ft15.add({
      id: ui,
      client: key,
      id_: id,
      fecha: fecha,
      tipo: 'RTPE',
      name: 'REPORTE TÉCNICO DE PROYECTO ELÉCTRICO',
      cod: 'FT-15',
      rev: 5,
      vigen: '17-Nov-17',
      nomycar: '',
      objeto: '',
      fechad: '',
      fecham: '',
      fechaa: '',
      horai: '',
      horaf: '',
      circuns: '',
      no_conf: '',
      observa: '',
      acciones: '',
      firma: '',
      nom1: '',
      id1: '',
      folio1: '',
      exp1: '',
      direc1: '',
      firma1: '',
      nom2: '',
      id2: '',
      folio2: '',
      exp2: '',
      direc2: '',
      firma2: '',
      nom3: '',
      id3: '',
      folio3: '',
      exp3: '',
      direc3: '',
      firma3: ''
    }
    );
  }
  async addft81Offline(key: string, fecha: string, id: number) {
    const ui = UUID.UUID();
    await this.localDb.ft81.add({
      id: ui, client: key, id_: id, fecha: fecha, tipo: 'NOM', desc: 'INS', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: '', filas: 1
    }
    );
  }
  async addft82Offline(key: string, fecha: string, id: number) {
    const ui = UUID.UUID();
    await this.localDb.ft82.add({
      id: ui, client: key, id_: id, fecha: fecha, tipo: 'PEC', desc: 'PRO', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: '', filas: 1
    }
    );
  }
*/
  async addFt10Offline(key: string) {
    // const ft10local = [];
    this.f10.forEach(async item => {
      const ui = UUID.UUID();
      await this.localDb.ft10.add({
        id: ui, client: key, id_: item.id_, cri: item.cri,
        cum: item.cum, nom: item.nom, obp: item.obp,
        obs: item.obs, tex: item.tex, tip: item.tip
      });
    });
  }
/*  async addFt06Offline(key: string) {
    this.f06.forEach(async item => {
      const ui = UUID.UUID();
      await this.localDb.ft06.add({
        id: ui, client: key, id_: item.id_, cri: item.cri,
        cum: item.cum, nom: item.nom, obp: item.obp,
        obs: item.obs, tex: item.tex, tip: item.tip
      });
    });
  } */

  async addRowFt10(f10: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.ft10List.push(f10 as F10);
      this.GetDataList10();
      this.dataft10List.push(f10 as F10);
    } /* else {
      const ui = UUID.UUID();
      await this.localDb.ft10.add({
        id: ui, client: key, id_: f10.id_, cri: f10.cri,
        cum: f10.cum, nom: f10.nom, obp: f10.obp,
        obs: f10.obs, tex: f10.tex, tip: f10.tip
      });
    } */
  }
  /* async addRowFt06(f06: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.ft06List.push(f06 as F10);
    } else {
      const ui = UUID.UUID();
      await this.localDb.ft06.add({
        id: ui, client: key, id_: f06.id_, cri: f06.cri,
        cum: f06.cum, nom: f06.nom, obp: f06.obp,
        obs: f06.obs, tex: f06.tex, tip: f06.tip
      });
    }
  } */

  updateRowFt10(f10: F10, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.f10Object.update({ nom: f10.nom, tex: f10.tex, tip: f10.tip, cri: f10.cri, obp: f10.obp, obs: f10.obs, cum: f10.cum });
    }/*  else {
      this.localDb.ft10 // Offline
        .where('id').equals(key).modify(cc => {
          cc.cri = f10.cri;
          cc.cum = f10.cum;
          cc.nom = f10.nom;
          cc.obp = f10.obp,
          cc.obs = f10.obs;
          cc.tex = f10.tex;
          cc.tip = f10.tip;
        });
    } */
  }
  /* updateRowFt06(f06: F10, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.f06Object.update({ nom: f06.nom, tex: f06.tex, tip: f06.tip, cri: f06.cri, obp: f06.obp, obs: f06.obs, cum: f06.cum });
    } else {
      this.localDb.ft06 // Offline
        .where('id').equals(key).modify(cc => {
          cc.cri = f06.cri;
          cc.cum = f06.cum;
          cc.nom = f06.nom;
          cc.obp = f06.obp,
          cc.obs = f06.obs;
          cc.tex = f06.tex;
          cc.tip = f06.tip;
        });
    }
  } */

  Getf10(key: string) {
    this.ft10List = this.db.list('data/' + key + '/ft10', ref =>
      ref.orderByChild('id_')
    );
    return this.ft10List;
  }
 /*  Getf06(key: string) {
    this.ft06List = this.db.list('data/' + key + '/ft06', ref =>
      ref.orderByChild('id_')
    );
    return this.ft06List;
  }
  Getf81(key: string) {
    this.ft81List = this.db.list('data/' + key + '/ft81', ref =>
      ref.orderByChild('id_')
    );
    return this.ft81List;
  }
  Getf82(key: string) {
    this.ft82List = this.db.list('data/' + key + '/ft82', ref =>
      ref.orderByChild('id_')
    );
    return this.ft82List;
  }
  Getf07(key: string) {
    this.ft07List = this.db.list('data/' + key + '/ft07', ref =>
      ref.orderByChild('id_')
    );
    return this.ft07List;
  }
  Getf15(key: string) {
    this.ft15List = this.db.list('data/' + key + '/ft15', ref =>
      ref.orderByChild('id_')
    );
    return this.ft15List;
  } */

  updateClient(datos: Datos, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key).update({ datos });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(c => {
          c.datos.razon = datos.razon;
          c.datos.giro = datos.giro;
          c.datos.nocontrol = datos.nocontrol;
          c.datos.nombre = datos.nombre;
          c.datos.nomcom = datos.nomcom;
          c.datos.tel = datos.tel;
          c.datos.correo = datos.correo;
          c.datos.fax = datos.fax;
          c.datos.pedido = datos.pedido;
          c.datos.rfc = datos.rfc;
          c.datos.calle = datos.calle;
          c.datos.colonia = datos.colonia;
          c.datos.munic = datos.munic;
          c.datos.estado = datos.estado;
          c.datos.cp = datos.cp;
          c.datos.tipos = datos.tipos;
          c.datos.tension = datos.tension;
          c.datos.planos = datos.planos;
          c.datos.cargai = datos.cargai;
          c.datos.alcance = datos.alcance;
          c.datos.factor = datos.factor;
          c.datos.cargadem = datos.cargadem;
          c.datos.corriente = datos.corriente;
          c.datos.volts = datos.volts;
          c.datos.sub = datos.sub;
          c.datos.area = datos.area;
          c.datos.costo = datos.costo;
          c.datos.costol = datos.costol;
          c.datos.cent = datos.cent;
          c.datos.instal = datos.instal;
          c.datos.ambien = datos.ambien;
          c.datos.memo = datos.memo;
          c.datos.nombreuv = datos.nombreuv;
          c.datos.nombrers = datos.nombrers;
          c.datos.nombrerp = datos.nombrerp;
          c.datos.logo = datos.logo;
          c.datos.dia = datos.dia;
          c.datos.mes = datos.mes;
          c.datos.anio = datos.anio;
          c.datos.fechai = datos.fechai;
          c.datos.fechaf = datos.fechaf;
          c.datos.cargouv = datos.cargouv;
          c.datos.fpago = datos.fpago;
          c.datos.vigencia = datos.vigencia;
          c.datos.intro = datos.intro;
          c.datos.intro2 = datos.intro2;
          c.datos.date = datos.date;
          c.datos.fft01 = datos.fft01;
          c.datos.fft02 = datos.fft02;
          c.datos.fft03 = datos.fft03;
          c.datos.fft05 = datos.fft05;
          c.datos.fft06 = datos.fft06;
          c.datos.fft09 = datos.fft09;
          c.datos.fft10 = datos.fft10;
          c.datos.fft11 = datos.fft11;
          c.datos.fft12 = datos.fft12;
          c.datos.fft13 = datos.fft13;
          c.datos.ffc07 = datos.ffc07;
          c.datos.fft08ie1 = datos.fft08ie1;
          c.datos.fft08ie2 = datos.fft08ie2;
          c.datos.fft08pe1 = datos.fft08pe1;
          c.datos.fft08pe2 = datos.fft08pe2;
          c.datos.fft151 = datos.fft151;
          c.datos.fft152 = datos.fft152;
          c.datos.fft071 = datos.fft071;
          c.datos.fft072 = datos.fft072;
          c.datos.id = datos.id;
          c.datos.folio = datos.folio;
          c.datos.id2 = datos.id2;
          c.datos.folio2 = datos.folio2;
          c.datos.foliorp = datos.foliorp;
          c.datos.cedula = datos.cedula;
          c.datos.s1 = datos.s1;
          c.datos.s2 = datos.s2;
          c.datos.dato1 = datos.dato1;
          c.datos.dato2 = datos.dato2;
          c.datos.dato3 = datos.dato3;
          c.datos.dato4 = datos.dato4;
          c.datos.dato5 = datos.dato5;
          c.datos.dato6 = datos.dato6;
          c.datos.dato7 = datos.dato7;
          c.datos.dato8 = datos.dato8;
          c.datos.dato9 = datos.dato9;
          c.datos.dato10 = datos.dato10;
          c.datos.dato11 = datos.dato11;
          c.datos.dato12 = datos.dato12;
        });
    }
  }

  GetDataList() {
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('date')
    );
    return this.dataList;
  }
  GetDataListA(anio: string) {
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('anio').equalTo(anio)
    );
    return this.dataList;
  }
  GetDataList10() {
    this.dataft10List = this.db.list('ft10L', ref =>
      ref.orderByChild('id_')
    );
    return this.dataft10List;
  }

  getCurrentData(key: string) {
    this.clientObject = this.db.object('data/' + key);
    return this.clientObject;
  }

  getCurrentDataF10Row(key: string, key2: string) {
    this.f10Object = this.db.object('data/' + key + '/ft10/' + key2);
    return this.f10Object;
  }
 /*  getCurrentDataF06Row(key: string, key2: string) {
    this.f06Object = this.db.object('data/' + key + '/ft06/' + key2);
    return this.f06Object;
  }
  getCurrentDataF81(key: string, key2: string) {
    this.f81Object = this.db.object('data/' + key + '/ft81/' + key2);
    return this.f81Object;
  }
  getCurrentDataF82(key: string, key2: string) {
    this.f81Object = this.db.object('data/' + key + '/ft82/' + key2);
    return this.f81Object;
  }

  getCurrentDataF07(key: string, key2: string) {
    this.f07Object = this.db.object('data/' + key + '/ft07/' + key2);
    return this.f07Object;
  }
  getCurrentDataF15(key: string, key2: string) {
    this.f07Object = this.db.object('data/' + key + '/ft15/' + key2);
    return this.f07Object;
  } */

  UpdateFt01(ft01: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ 
          s1: ft01.s1,
          s2: ft01.s2,
          fpago: ft01.fpago,
          vigencia: ft01.vigencia,
          intro: ft01.intro,
          intro2: ft01.intro2,
          dato1: ft01.dato1,
          dato2: ft01.dato2,
          dato3: ft01.dato3,
          dato4: ft01.dato4,
          dato5: ft01.dato5,
          dato6: ft01.dato6,
          dato7: ft01.dato7,
          dato8: ft01.dato8,
          dato9: ft01.dato9,
          dato10: ft01.dato10,
          dato11: ft01.dato11,
          dato12: ft01.dato12
         });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.s1 = ft01.s1;
          client.datos.s2 = ft01.s2;
          client.datos.fpago = ft01.fpago;
          client.datos.vigencia = ft01.vigencia;
          client.datos.intro = ft01.intro;
          client.datos.intro2 = ft01.intro2;
          client.datos.dato1 = ft01.dato1;
          client.datos.dato2 = ft01.dato2;
          client.datos.dato3 = ft01.dato3;
          client.datos.dato4 = ft01.dato4;
          client.datos.dato5 = ft01.dato5;
          client.datos.dato6 = ft01.dato6;
          client.datos.dato7 = ft01.dato7;
          client.datos.dato8 = ft01.dato8;
          client.datos.dato9 = ft01.dato9;
          client.datos.dato10 = ft01.dato10;
          client.datos.dato11 = ft01.dato11;
          client.datos.dato12 = ft01.dato12;
        });
    }
  }

  UpdateFt02(f02: F02, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft02: f02 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft02 = f02;
        });
    }
  }

  UpdateFt03(f03: F03, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft03: f03 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft03 = f03;
        });
    }
  }

  UpdateFt05(f05: F05, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft05: f05 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft05 = f05;
        });
    }
  }

  UpdateFt06(f06: F06, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft06: f06 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft06 = f06;
        });
    }
  }

  UpdateFc07(f07: F07, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ fc07: f07 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.fc07 = f07;
        });
    }
  }

  UpdateFt09(f09: F09, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft09: f09 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft09 = f09;
        });
    }
  }

  UpdateFt11(f11: F11, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key)
        .update({ ft11: f11 });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.ft11 = f11;
        });
    }
  }

  UpdateFt08(f08: F081, key: string, type: string) {
    if (this.offlineOnlineService.isOnline) {
      if (type === '8i1') {
        this.db.object('data/' + key).update({ fti81: f08 });
      }
      if (type === '8i2') {
        this.db.object('data/' + key).update({ fti82: f08 });
      }
      if (type === '8p1') {
        this.db.object('data/' + key).update({ ftp81: f08 });
      }
      if (type === '8p2') {
        this.db.object('data/' + key).update({ ftp82: f08 });
      }
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          if (type === '8i1') {
            client.fti81 = f08;
          }
          if (type === '8i2') {
            client.fti82 = f08;
          }
          if (type === '8p1') {
            client.ftp81 = f08;
          }
          if (type === '8p2') {
            client.ftp82 = f08;
          }
        });
    }
  }

  /* UpdateFt08INCIE1(f08: F081, key: string, type: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.f81Object.update({
        n1: f08.n1, n2: f08.n2, n3: f08.n3, n4: f08.n4, n5: f08.n5, n6: f08.n6,
        d1: f08.d1, d2: f08.d2, d3: f08.d3, d4: f08.d4, d5: f08.d5, d6: f08.d6,
        nc1: f08.nc1, nc2: f08.nc2, nc3: f08.nc3, nc4: f08.nc4, nc5: f08.nc5, nc6: f08.nc6,
        fr1: f08.fr1, fr2: f08.fr2, fr3: f08.fr3, fr4: f08.fr4, fr5: f08.fr5, fr6: f08.fr6,
        a1: f08.a1, a2: f08.a2, a3: f08.a3, a4: f08.a4, a5: f08.a5, a6: f08.a6,
        fs1: f08.fs1, fs2: f08.fs2, fs3: f08.fs3, fs4: f08.fs4, fs5: f08.fs5, fs6: f08.fs6, filas: f08.filas
      });
    } else {
      if (type === 'NOM') {
        this.localDb.ft81.where('id').equals(key).modify(cc => {
          cc.n1 = f08.n1; cc.n2 = f08.n2; cc.n3 = f08.n3; cc.n4 = f08.n4; cc.n5 = f08.n5; cc.n6 = f08.n6;
          cc.d1 = f08.d1; cc.d2 = f08.d2; cc.d3 = f08.d3; cc.d4 = f08.d4; cc.d5 = f08.d5; cc.d6 = f08.d6;
          cc.nc1 = f08.nc1; cc.nc2 = f08.nc2; cc.nc3 = f08.nc3; cc.nc4 = f08.nc4; cc.nc5 = f08.nc5; cc.nc6 = f08.nc6;
          cc.fr1 = f08.fr1; cc.fr2 = f08.fr2; cc.fr3 = f08.fr3; cc.fr4 = f08.fr4; cc.fr5 = f08.fr5; cc.fr6 = f08.fr6;
          cc.a1 = f08.a1; cc.a2 = f08.a2; cc.a3 = f08.a3; cc.a4 = f08.a4; cc.a5 = f08.a5; cc.a6 = f08.a6;
          cc.fs1 = f08.fs1; cc.fs2 = f08.fs2; cc.fs3 = f08.fs3; cc.fs4 = f08.fs4; cc.fs5 = f08.fs5; cc.fs6 = f08.fs6; cc.filas = f08.filas;
        });
      }
      if (type === 'PEC') {
        this.localDb.ft82.where('id').equals(key).modify(cc => {
          cc.n1 = f08.n1; cc.n2 = f08.n2; cc.n3 = f08.n3; cc.n4 = f08.n4; cc.n5 = f08.n5; cc.n6 = f08.n6;
          cc.d1 = f08.d1; cc.d2 = f08.d2; cc.d3 = f08.d3; cc.d4 = f08.d4; cc.d5 = f08.d5; cc.d6 = f08.d6;
          cc.nc1 = f08.nc1; cc.nc2 = f08.nc2; cc.nc3 = f08.nc3; cc.nc4 = f08.nc4; cc.nc5 = f08.nc5; cc.nc6 = f08.nc6;
          cc.fr1 = f08.fr1; cc.fr2 = f08.fr2; cc.fr3 = f08.fr3; cc.fr4 = f08.fr4; cc.fr5 = f08.fr5; cc.fr6 = f08.fr6;
          cc.a1 = f08.a1; cc.a2 = f08.a2; cc.a3 = f08.a3; cc.a4 = f08.a4; cc.a5 = f08.a5; cc.a6 = f08.a6;
          cc.fs1 = f08.fs1; cc.fs2 = f08.fs2; cc.fs3 = f08.fs3; cc.fs4 = f08.fs4; cc.fs5 = f08.fs5; cc.fs6 = f08.fs6; cc.filas = f08.filas;
        });
      }
    }
  } */

  /* UpdateFt07(f07: Ft7, key: string, type: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.f07Object.update({
        nomycar: f07.nomycar, objeto: f07.objeto, fechad: f07.fechad, fecham: f07.fecham,
        fechaa: f07.fechaa, horai: f07.horai, horaf: f07.horaf, circuns: f07.circuns,
        no_conf: f07.no_conf, observa: f07.observa, acciones: f07.acciones, firma: f07.firma,
        nom1: f07.nom1, id1: f07.id1, folio1: f07.folio1, exp1: f07.exp1, direc1: f07.direc1, firma1: f07.firma1,
        nom2: f07.nom2, id2: f07.id2, folio2: f07.folio2, exp2: f07.exp2, direc2: f07.direc2, firma2: f07.firma2,
        nom3: f07.nom3, id3: f07.id3, folio3: f07.folio3, exp3: f07.exp3, direc3: f07.direc3, firma3: f07.firma3
      });
    } else {
      if (type === 'AECIE') {
        this.localDb.ft07.where('id').equals(key).modify(cc => {
          cc.nomycar = f07.nomycar; cc.objeto = f07.objeto; cc.fechad = f07.fechad; cc.fecham = f07.fecham;
          cc.fechaa = f07.fechaa; cc.horai = f07.horai; cc.horaf = f07.horaf; cc.circuns = f07.circuns;
          cc.no_conf = f07.no_conf; cc.observa = f07.observa; cc.acciones = f07.acciones; cc.firma = f07.firma;
          cc.nom1 = f07.nom1; cc.id1 = f07.id1; cc.folio1 = f07.folio1; cc.exp1 = f07.exp1; cc.direc1 = f07.direc1; cc.firma1 = f07.firma1;
          cc.nom2 = f07.nom2; cc.id2 = f07.id2; cc.folio2 = f07.folio2; cc.exp2 = f07.exp2; cc.direc2 = f07.direc2; cc.firma2 = f07.firma2;
          cc.nom3 = f07.nom3; cc.id3 = f07.id3; cc.folio3 = f07.folio3; cc.exp3 = f07.exp3; cc.direc3 = f07.direc3; cc.firma3 = f07.firma3;
        });
      }
      if (type === 'RTPE') {
        this.localDb.ft15.where('id').equals(key).modify(cc => {
          cc.nomycar = f07.nomycar; cc.objeto = f07.objeto; cc.fechad = f07.fechad; cc.fecham = f07.fecham;
          cc.fechaa = f07.fechaa; cc.horai = f07.horai; cc.horaf = f07.horaf; cc.circuns = f07.circuns;
          cc.no_conf = f07.no_conf; cc.observa = f07.observa; cc.acciones = f07.acciones; cc.firma = f07.firma;
          cc.nom1 = f07.nom1; cc.id1 = f07.id1; cc.folio1 = f07.folio1; cc.exp1 = f07.exp1; cc.direc1 = f07.direc1; cc.firma1 = f07.firma1;
          cc.nom2 = f07.nom2; cc.id2 = f07.id2; cc.folio2 = f07.folio2; cc.exp2 = f07.exp2; cc.direc2 = f07.direc2; cc.firma2 = f07.firma2;
          cc.nom3 = f07.nom3; cc.id3 = f07.id3; cc.folio3 = f07.folio3; cc.exp3 = f07.exp3; cc.direc3 = f07.direc3; cc.firma3 = f07.firma3;
        });
      }
    }
  } */
  UpdateFt07n(f07: Ft7, key: string, type: string) {
    if (this.offlineOnlineService.isOnline) {
      if (type === '71') {
        this.db.object('data/' + key).update({ ft71: f07 });
      }
      if (type === '72') {
        this.db.object('data/' + key).update({ ft72: f07 });
      }
      if (type === '151') {
        this.db.object('data/' + key).update({ ft151: f07 });
      }
      if (type === '152') {
        this.db.object('data/' + key).update({ ft152: f07 });
      }
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          if (type === '71') {
            client.ft71 = f07;
          }
          if (type === '72') {
            client.ft72 = f07;
          }
          if (type === '151') {
            client.ft151 = f07;
          }
          if (type === '152') {
            client.ft152 = f07;
          }
        });
    }
  }

  DeleteForm(key: string) {
    this.clientObject = this.db.object('data/' + key);
    this.clientObject.remove();
  }

  /** Update dates */
  /* upfi(f: string, key: string) {
    const dd = this.splitDate(f);
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fechai: f, dia: dd.d, mes: dd.m, anio: dd.a });
    } else {
      this.localDb.clients.where('id').equals(key).modify(client => { // Offline
        client.datos.fechai = f;
        client.datos.dia = dd.d;
        client.datos.mes = dd.m;
        client.datos.anio = dd.a;
      });
    }
  }
  upf02(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft02: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft02 = f;
        });
    }
  }
  upf03(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft03: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft03 = f;
        });
    }
  }
  upf05(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft05: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft05 = f;
        });
    }
  }
  upf06(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft06: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft06 = f;
        });
    }
  }
  upf09(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft09: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft09 = f;
        });
    }
  }
  upf10(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft10: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft10 = f;
        });
    }
  }
  upf11(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ fft11: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.fft11 = f;
        });
    }
  }
  upfc07(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ ffc07: f });
    } else {
      this.localDb.clients
        .where('id').equals(key).modify(client => {
          client.datos.ffc07 = f;
        });
    }
  } */
  /* upft07(f: string, key: string, key2: string) {  // Online
    this.db.object('data/' + key + '/ft07/' + key2)
      .update({ fecha: f });
  }
  upft07Off(f: string, id: string) {   // Offline
    this.localDb.ft07.where('id').equals(id).modify(client => {
      client.fecha = f;
    });
  }
  upf15(f: string, key: string, key2: string) {   // Online
    this.db.object('data/' + key + '/ft15/' + key2)
      .update({ fecha: f });
  }
  upft15Off(f: string, id: string) {   // Offline
    this.localDb.ft15.where('id').equals(id).modify(client => {
      client.fecha = f;
    });
  }
  upf81(f: string, key: string, key2: string) {
    this.db.object('data/' + key + '/ft81/' + key2)
      .update({ fecha: f });
  }
  upft81Off(f: string, id: string) {   // Offline
    this.localDb.ft81.where('id').equals(id).modify(client => {
      client.fecha = f;
    });
  }
  upf82(f: string, key: string, key2: string) {
    this.db.object('data/' + key + '/ft82/' + key2)
      .update({ fecha: f });
  }
  upft82Off(f: string, id: string) {   // Offline
    this.localDb.ft82.where('id').equals(id).modify(client => {
      client.fecha = f;
    });
  } */

  /** IndexedDB Offline */

  private registerToEvents(onlineOfflineService: OfflineOnlineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        // console.log('went online');
        console.log('sending all stored items');
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.localDb = new Dexie('LocalDB');
    this.localDb.version(1).stores({
      clients: 'id',
      /* ft07: 'id, client',
      ft15: 'id, client',
      ft81: 'id, client',
      ft82: 'id, client', */
      ft10: 'id, client, id_'/* ,
      ft06: 'id, client, id_' */
    });
  }

  private addToIndexedDb(client: Client) {
    this.localDb.clients
      .add(client)
      .then(async () => {
        const allItems: Client[] = await this.localDb.clients.toArray();
      //  console.log('saved in DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  public async sendItemsFromIndexedDb() {
    this.GetDataList();
    const allItems: Client[] = await this.localDb.clients.toArray();
    allItems.forEach((item: Client) => {
      this.localDb.clients.delete(item.id).then(async () => {
        const f10Items = await this.localDb.ft10.where('client').equals(item.id).toArray();
        if (f10Items.length > 0) { item.ft10 = f10Items; }
        /* const f06Items = await this.localDb.ft06.where('client').equals(item.id).toArray();
        if (f06Items.length > 0) { item.ft06 = f06Items; }
        const f07Items = await this.localDb.ft07.where('client').equals(item.id).toArray();
        if (f07Items.length > 0) { item.ft07 = f07Items; }
        const f15Items = await this.localDb.ft15.where('client').equals(item.id).toArray();
        if (f15Items.length > 0) { item.ft15 = f15Items; }
        const f81Items = await this.localDb.ft81.where('client').equals(item.id).toArray();
        if (f81Items.length > 0) { item.ft81 = f81Items; }
        const f82Items = await this.localDb.ft82.where('client').equals(item.id).toArray();
        if (f82Items.length > 0) { item.ft82 = f82Items; } */
        this.dataList.push(item);
       // console.log(`item ${item.id} sent and deleted locally`);
      });
    });
  }


  addClientOffline(client: Client) {
    client.id = UUID.UUID();
    this.addToIndexedDb(client);
  }

  public async getDataOffline() {
    this.dataOffline = await this.localDb.clients.toArray();
  }

  /* deleteRowFt06(key: string, key2: string) {
    this.deleteObject = this.db.object('data/' + key + '/ft06/' + key2);
    this.deleteObject.remove();
  } */
  deleteRowFt10(key: string, key2: string) {
    this.deleteObject = this.db.object('data/' + key + '/ft10/' + key2);
    this.deleteObject.remove();
  }

  /* public getClientOffline(id: string) {
    this.localDb.clients
    .get(id)
    .then(async (client) => {
      console.log('got it!!' + client.datos.razon);
      this.clientOffline = client;
    })
    .catch(e => {
      alert('Error: ' + (e.stack || e));
    });
  } */

  /* public async addFt10Offline(id: string) {
    const ft10local = [];
    this.f11.forEach(item => {
      const key = UUID.UUID();
      ft10local.push({
        key: key, id_: item.id_, cri: item.cri,
        cum: item.cum, nom: item.nom, obp: item.obp,
        obs: item.obs, tex: item.tex, tip: item.tip
      });
    });
    await this.localDb.clients
        .where('id')
        .equals(id)
        .modify(client => {
          client.ft10 = ft10local;
        });
  } */

}
