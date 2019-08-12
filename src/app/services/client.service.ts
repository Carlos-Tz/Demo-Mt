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
  public ft10List: AngularFireList<any>;
  public ft81List: AngularFireList<any>;
  public ft82List: AngularFireList<any>;
  public ft07List: AngularFireList<any>;
  public ft15List: AngularFireList<any>;
  public ft10: F10[];
  public clientObject: AngularFireObject<any>;
  public f10Object: AngularFireObject<any>;
  public f81Object: AngularFireObject<any>;
  public f07Object: AngularFireObject<any>;
  public f10 = [
    {
      id_: 1,
      nom: '',
      tex: '110 Requisitos generales',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 2,
      nom: '110-2',
      tex: 'Aprobación',
      tip: 'O',
      cri: 'Los materiales y equipos utilizados están aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 4,
      nom: '110-7',
      tex: 'Integridad de aislamiento',
      tip: 'O,M',
      cri: 'El sistema esta libre de corto circuito y de conexiones a tierra por falla. PEC5.1',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 5,
      nom: '110-9',
      tex: 'Corriente de interrupción',
      tip: 'O',
      cri: 'Los interruptores tienen un rango de operación suficiente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 6,
      nom: '110-12',
      tex: 'Ejecución mecánica de los trabajos',
      tip: 'O',
      cri: 'Los equipos están instalados de manera limpia y profesional',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 7,
      nom: '10-12 a )',
      tex: 'Aberturas no utilizadas',
      tip: 'O',
      cri: 'Las aberturas no utilizadas en las canalizaciones están cerradas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 8,
      nom: '110-13',
      tex: 'Montaje y enfriamiento del equipo',
      tip: 'O',
      cri: 'El equipo esta montado de manera segura, anclado y el espacio de ventilación es adecuado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 9,
      nom: '110-14 a ) 110-14 b) 110-14 c )',
      tex: 'Conexiones eléctricas terminales y empalmes Limitaciones de temperatura',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores esta conectados con dispositivos adecuados El conductor no excede la temperatura de operación de terminales del equipo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 10,
      nom: '110-16',
      tex: 'Señales de advertencia contra arco eléctrico',
      tip: '',
      // tslint:disable-next-line: max-line-length
      cri: 'Los tableros de distribución, tableros de control industrial, envolventes para medidores enchufables y centros de control de motores, deben estar marcados para advertir del peligro potencial de arco eléctrico',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 11,
      nom: '110-26',
      tex: 'Espacio de trabajo',
      tip: 'O',
      cri: 'Alrededor del equipo existe suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 12,
      nom: '110-22',
      tex: 'Identificación de los medios de desconexión',
      tip: 'O',
      cri: 'Los medios de desconexión están identificados indicando su propósito',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 13,
      nom: '110-31',
      tex: 'Envolventes de las instalaciones eléctricas',
      tip: '',
      cri: 'Cuando el acceso sea controlado, solo deben ser accesibles por personal calificado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 14,
      nom: '',
      tex: '210 Circuitos derivados',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 15,
      nom: '210-3',
      tex: 'Clasificación',
      tip: 'O',
      cri: 'Los circuitos están clasificados según la capacidad de conducción de corriente máxima ó según el valor de la protección',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 16,
      nom: '210-5',
      tex: 'Identificación de los circuitos derivados',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El conductor de puesto a tierra es blanco y el de puesta a tierra es desnudo y verde, las fases de color diferente, como, azul, negra, roja',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 17,
      nom: '210-19 210-20',
      tex: 'Conductores tamaño nominal Protección contra sobre-corriente',
      tip: 'O',
      cri: 'El tamaño de conductores corresponde con la carga y están protegidos contra sobre-corriente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 18,
      nom: '210-21 210-24',
      tex: 'Dispositivos de salida Requisitos de los circuitos derivados- resumen',
      tip: 'O',
      cri: 'Los circuitos tienen las capacidades nominales permitidas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 19,
      nom: '220-12',
      tex: 'Cargas de alumbrado para lugares especificos',
      tip: 'O',
      cri: 'Los circuitos están previstos para las cargas calculadas, según 220-12',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 20,
      nom: '210-23',
      tex: 'Cargas permisibles',
      tip: 'D',
      cri: 'Los circuitos alimentan las cargas permisibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 21,
      nom: '',
      tex: '215 Alimentadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 22,
      nom: '215-2',
      tex: 'Capacidad nominal y tamaño mínimo del conductor',
      tip: 'O',
      cri: 'Los alimentadores tienen el tamaño mínimo requerido',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 23,
      nom: '215-3 220-12',
      tex: 'Protección contra sobre-corriente Capacidad de conducción de corriente',
      tip: 'O',
      cri: 'El interruptor y el conductor son del tamaño adecuado para las cargas continuas y no continuas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 24,
      nom: '220-12 220-61',
      tex: 'Capacidad de conducción de corriente Carga del neutro del alimentador',
      tip: 'D',
      cri: 'Los conductores son adecuados para la carga',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 25,
      nom: '215-5',
      tex: 'Diagrama Unifilar de Alimentadores',
      tip: 'O',
      cri: 'Contenga M2 , carga conectada, FD, datos conductor, %e, canalizaciones',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 26,
      nom: '215-10 230-95',
      tex: 'Protección a tierra Protección del equipo contra falla a tierra',
      tip: 'O',
      cri: 'Los interruptores deben tener protección de falla a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 27,
      nom: '',
      tex: '225 Circuitos Derivados y Alimentadores Exteriores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
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
      cum: ''
    }, {
      id_: 29,
      nom: '225-15 225-18',
      tex: 'Soporte sobre edificios Libramiento para conductores y cables aéreos',
      tip: 'O',
      cri: 'Conductores apoyados en estructuras sólidas Para diferentes condiciones la altura varía de 3.0 a 5.5 M',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 30,
      nom: '240-4 240-21 240-21 b) 1)',
      tex: 'Protección de los conductores Ubicación en el circuito Derivaciones no mayores a 3.0 m de largo',
      tip: 'O',
      cri: 'Los conductores están debidamente protegidos por interruptores conectados al inicio y en cada conductor de fase',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 31,
      nom: '',
      tex: '230 Acometidas',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 32,
      nom: '230-8',
      tex: 'Aplicado de Selladores en las canalizaciones',
      tip: 'O',
      cri: 'La canalización subterránea esta sellada en ambos extremos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 33,
      nom: '230-24 230-26 230-27',
      tex: 'Libramientos Punto de sujeción Medios de sujeción',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Entre los conductores de acometida existen distancias adecuadas de seguridad y no son fácilmente accesibles. Están firmemente sujetos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 34,
      nom: '230-32 230-50 a)',
      tex: 'Protección contra daños Protección contra daño físico en acometidas subterráneos',
      tip: 'O',
      cri: 'La acometida subterránea está protegida y a una profundidad de 50 CM',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 35,
      nom: '230-23 230-31 230-42',
      tex: 'Tamaño y ampacidad del conductor',
      tip: 'O',
      cri: 'Las capacidades nominales y calibres de los conductores son los adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 36,
      nom: '230-82 250-24 b)',
      tex: 'Equipo conectado en el lado línea del medio de desconexión de los conductores de recepción del suministro',
      tip: 'O',
      cri: 'Los gabinetes y partes metálicas del equipo de acometida están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 37,
      nom: '230-24 230-208 230-66',
      tex: 'Espacio de trabajo Requisitos de protección contra sobrecorriente Marcado',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Existe espacio de trabajo alrededor del equipo de acometida. El interruptor tiene la capacidad interruptiva adecuada. El equipo está aprobado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 38,
      nom: '230-79 230-80',
      tex: 'Capacidad del equipo de desconexión Capacidades combinadas de los medios de desconexión',
      tip: 'O',
      cri: 'Las capacidades nominales de los medios de desconexión son las adecuadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 39,
      nom: '',
      tex: '240 Protección contra Sobrecorriente',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 40,
      nom: '240-4',
      tex: 'Protección de los conductores',
      tip: 'O',
      cri: 'Los conductores están protegidos contra sobrecorriente de acuerdo a su ampacidad',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 41,
      nom: '240-12',
      tex: 'Coordinación del sistema eléctrico',
      tip: 'O',
      cri: 'Existe una coordinación de protecciones contra cortocircuito.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 42,
      nom: '240-15',
      tex: 'Conductores de fase',
      tip: 'O',
      cri: 'Existen dispositivos de protección contra sobrecorriente requerido.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 43,
      nom: '240-21',
      tex: 'Ubicación en el circuito',
      tip: 'O',
      cri: 'Existe la protección contra sobrecorriente en cada conductor de fase de circuito.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 44,
      nom: '240-30 a)',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los dispositivos de sobrecorriente están protegidos contra daño físico.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 45,
      nom: '240-83 c)',
      tex: 'Valor nominal de interrupción',
      tip: 'O',
      cri: 'Todos los interruptores están marcados su valor nominal de interrupción.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 46,
      nom: '240-90',
      tex: 'General',
      tip: 'O',
      cri: 'Las protecciones contra sobrecorriente en las áreas industriales están supervisadas.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 47,
      nom: '240-100',
      tex: 'Alimentadores y circuitos derivados',
      tip: 'O',
      cri: 'Cuentan todos los alimentadores y circuitos derivados con su protección contra sobrecorriente.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 48,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 49,
      nom: '250-24',
      tex: 'Puesta a tierra de sistemas de corriente alterna alimentados por una acometida',
      tip: 'O',
      cri: 'Se tiene un conductor de puesta a tierra conectado al conductor puesto a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 50,
      nom: '250-28',
      tex: 'Puente unión principal y puente de unión del sistema',
      tip: 'O',
      cri: 'Son de material resistente a la corrosión, barra, conductor o tornillo, tamaño acorde a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 51,
      nom: '250-80 250-92',
      tex: 'Canalizaciones y envolventes de acometida. Unión de equipos de acometidas',
      tip: 'O',
      cri: 'Las partes metálicas no conductoras están conectadas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 52,
      nom: '250-50',
      tex: 'Sistema de electrodos de puesta a tierra',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La tubería de agua y estructura metálica del edificio son electrodos y electrodos prefabricados pueden usarse en el sistema de electrodos y deben interconectarse entre si, los diferentes sistemas de tierra deben conectarse entre si',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 53,
      nom: '250-53',
      tex: 'Instalación del sistema de electrodo de puesta a tierra',
      tip: 'O',
      cri: 'Existen electrodos especialmente construidos, como: varilla, tubería de agua, placas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 54,
      nom: '250-66',
      tex: 'Tamaño del conductor del electrodo de puesta atierra de corriente alterna',
      tip: 'O, D',
      cri: 'Se especificó de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 55,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 56,
      nom: '250-64',
      tex: 'Instalación del conductor del electrodo de puesta a tierra.',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores de puesta a tierra están firmemente sujetos, protegidos y asegurados contra daño físico, son eléctricamente continuos y están conectados con materiales aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 57,
      nom: '250-68',
      tex: 'Conexión del conductor del electrodo de puesta a tierra y del puente de unión',
      tip: 'O',
      cri: 'Las conexiones a los electrodos están accesibles y aseguran una puesta a tierra eficaz. Existen puentes de unión',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 58,
      nom: '250-70',
      tex: 'Métodos de conexión del conductor de puesta a tierra y de unión a los electrodos',
      tip: 'O',
      cri: 'La conexión esta hecha con soldadura exotérmica, zapatas, conectores a presión, abrazaderas u otros medios aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 59,
      nom: '250-52',
      tex: 'Electrodos de puesta a tierra',
      tip: 'O',
      cri: 'La tubería metálica de agua y las armazones estructurales están conectadas equipotencialmente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 60,
      nom: '250-168',
      tex: 'Puente de unión del sistema corriente continua',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Existe un puente de unión principal, sin empalmes, que conecta al conductor de puesta a tierra de equipo y el envolvente del medio de desconexión de la acometida al conductor puesto a tierra del sistema',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 61,
      nom: '250-92 b) 250-102',
      tex: 'Método de unión en la acometida Conductores y puente del equipo',
      tip: 'O',
      cri: 'Las canalizaciones y gabinetes del equipo de acometida están conectados equipotencialmente en forma correcta.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 62,
      nom: '250-28 d) 1) 250-24 c)',
      // tslint:disable-next-line: max-line-length
      tex: 'Puente de unión principal y puente de unión del sistema. Tamaño nominal. Conductor puesto a tierra llevado al equipo de acometida',
      tip: 'O',
      cri: 'Verificar que el calibre del conductor de puesta a tierra del electrodo, en la acometida este de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 63,
      nom: '250-30',
      tex: 'Pues a tierra de sistemas de CA derivados separados',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Revisar que los sistemas derivados independientemente tengan electrodos de puesta a tierra, conductores de electrodos de puesta a tierra y puentes de conexión equipotencial adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 64,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de equipos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 65,
      nom: '250-118',
      tex: 'Tipos de conductores de puesta a tierra de equipos',
      tip: 'O',
      cri: 'Cobre o aluminio, tubo conduit metálico, en c/derivado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 66,
      nom: '250-146',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja',
      tip: 'O',
      cri: 'Verificar que la terminal de puesta a tierra del contacto este conectada a la caja metálica',
      obp: '',
      obs: '',
      cum: ''
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
      cum: ''
    }, {
      id_: 68,
      nom: '408-40',
      tex: 'Puesta a tierra de los tableros de alumbrado y control',
      tip: 'O',
      cri: 'Los tableros de alumbrado y control están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 69,
      nom: '250-142',
      tex: 'Uso del conductor de puesto a tierra del circuito para puesta a tierra de equipos',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Lado suministro: se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra Lado de la carga: no se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 70,
      nom: '250-146 406-3 d)',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja Contactos con puesta a tierra aislada',
      tip: '',
      cri: 'Los contactos de tierra aislada están identificados con un triángulo naranja y los conductores de puesta a tierra son aislados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 71,
      nom: '',
      tex: '300 Métodos de Alambrado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 72,
      nom: '300-3 a), b) y c) 1) 2)',
      tex: 'Conductores',
      tip: 'O',
      cri: 'Los conductores, individuales, del mismo circuito y de menos de 600 V, están instalados en canalizaciones metálicas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 73,
      nom: '300-4',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los conductores están separados de los bordes de las canalizaciones metálicas y están protegidos contra tornillos y clavos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 74,
      nom: '300-4 g)',
      tex: 'Accesorios aislados',
      tip: 'O',
      cri: 'Las boquillas de las canalizaciones tienen una superficie lisa y redondeada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 75,
      nom: '300-3 2)',
      tex: 'Conductores de puesta a tierra y de unión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Se permitirá que los conductores de puesta atierra de equipos estén instalados afuera de la canalización o del ensamble de cable, si están de acuerdo con las disposiciones de 250-130 c)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 76,
      nom: '300-10',
      tex: 'Continuidad eléctrica de las canalizaciones y envolventes metálicas',
      tip: 'O',
      cri: 'Las canalizaciones, cajas y gabinetes metálicos están unidos mecánicamente y tienen continuidad eléctrica',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 77,
      nom: '300-11',
      tex: 'Aseguramiento y soportes.',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las canalizaciones, cajas, gabinetes, cables y accesorios están firmemente sujetos y soportadas en su lugar , no se usan como medios de soporte',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 78,
      nom: '300-13',
      tex: 'Continuidad mecánica y eléctrica de los conductores',
      tip: 'O',
      cri: 'Los conductores son continuos entre las cajas, registros y gabinetes, no existen empalmes',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 79,
      nom: '300-14',
      tex: 'Longitud de los conductores libres en las salidas',
      tip: 'O',
      cri: 'Existen 15 cm de longitud adicional en las cajas y puntos de conexión',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 80,
      nom: '300-15',
      tex: 'Cajas o accesorios, cuando se requieren',
      tip: 'O',
      cri: 'Están instaladas cajas en los puntos de conexión, empalme, salida y alambrado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 81,
      nom: '300-17',
      tex: 'Número y tamaño de los conductores en una canalización',
      tip: 'O',
      cri: 'La ocupación de los conductores en las canalizaciones, es la correcta',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 82,
      nom: '300-18',
      tex: 'Instalación de canalizaciones',
      tip: 'O',
      cri: 'Las canalizaciones están instaladas de manera completa, antes de cablear',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 83,
      nom: '300-21',
      tex: 'Propagación de fuego o de productos de la combustión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las aberturas alrededor de los elementos eléctricos que pasan a través de paredes, pisos o techos resistentes al fuego están protegidas contra el fuego por métodos adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 84,
      nom: '',
      tex: '392 Charolas Portacables',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 85,
      nom: '392-18',
      tex: 'Instalación de charolas portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El sistema esta instalado de manera completa, no están instalados cables de mas de 600 v con otros de menor voltaje, están separadas 60 cm de otras tuberías de servicios',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 86,
      nom: '392-60',
      tex: 'Puesta a tierra y Unión',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Está provista de un conductor de puesta a tierra en toda la longitud de la charola y este esta conectado a la misma cada 15 m con un accesorio compatible con el material de la charola',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 87,
      nom: '392-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los empalmes no sobresalen los rieles laterales; los cables o sus conjuntos están fijos firmemente, los cables del 4 al 4/0 están colocados en una sola capa;',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 88,
      nom: '392-22',
      tex: 'Número de cables multiconductores de 2000 v nominales o menos en soportes tipo charola portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La suma de los diámetros de todos los cables no supera el ancho de la charola para cables de 4/0 o mayores; para cables menores a 4/0 la suma de las áreas no debe superar la superficie máxima permisible en la tabla 318-9. Ver las demás condiciones',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 89,
      nom: '392-22 a)',
      tex: 'Número de cables monoconductores ≤ 2000 V',
      tip: 'O',
      cri: 'Se acepta si están uniformemente distribuidos a lo ancho y hay espacio entre ellos, ver tabla 392-22 a)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 90,
      nom: '392-22 c)',
      tex: 'Número de cables de media tensión y tipo MC de (más de 2000 volts) en charolas portacables',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Cables mono-conductores en grupos de tres, cuatro están instalados en una sola capa y la suma de los diámetros de los cables agrupados no exceden el ancho de la charola',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 91,
      nom: '',
      tex: '358 Tubo conduit metáico ligero tipo EMT',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 92,
      nom: '358-10',
      tex: 'Usos permitidos',
      tip: 'O',
      cri: 'Se utiliza en instalaciones interiores ocultas y expuestas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 93,
      nom: '358-20',
      tex: 'Tamaño',
      tip: 'O',
      cri: 'Diámetro: Mínimo 16 mm (1/2”), Máximo 103 mm (4”)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 94,
      nom: '358-22',
      tex: 'Número de conductores',
      tip: '',
      cri: 'La ocupación de los conductores de acuerdo a la tabla 1, capitulo 10',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 95,
      nom: '358-28 358-42',
      tex: 'Desbastado y roscado Coples y conectores',
      tip: 'O',
      cri: 'El tubo instalado no está roscado, no hay bordes en sus extremos, los acoplamientos y accesorios están firmemente sujetos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 96,
      nom: '358-24 358-26',
      tex: 'Dobleces Número de curvas',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'En las curvas el tubo no ha sufrido daños. El radio de curvatura esta hecho de acuerdo a la tabla 2 capitulo 10. No existen mas de 4 dobleces de un cuadrante de (360ª en total)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 97,
      nom: '358-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      cri: 'Está sujeto firmemente por menos cada tres metros y no mayor de 90 cm de cada caja de salida',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 98,
      nom: '',
      tex: '314 Cajas, cajas de paso y sus accesorios, utilizados para salida, empalme, unión o jalado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 99,
      nom: '314-4',
      tex: 'Cajas metálicas',
      tip: 'O',
      cri: 'Las cajas metálicas están puestas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 100,
      nom: '314-16',
      tex: 'Número de conductores en las cajas de salida, de dispositivos y de unión y en las cajas de paso',
      tip: 'O',
      cri: 'Existe suficiente espacio para los conductores en las cajas y condulets',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 101,
      nom: '314-17 314-17 a)',
      tex: 'Conductores que entran en cajas, cajas de paso o accesorios',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión. Las aberturas no utilizadas están cerradas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 102,
      nom: '314-20',
      tex: 'En la pared o el plafón',
      tip: 'O',
      cri: 'Las cajas instaladas en paredes o los plafones no quede a más de 6 mm dentro de la superficie terminada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 103,
      nom: '314-21',
      tex: 'Reparación de superficies incombustibles',
      tip: 'O',
      cri: 'No existen espacios ni separaciones mayores que 3 mm en el borde de la caja.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 104,
      nom: '314-23',
      tex: 'Soportes',
      tip: 'O',
      cri: 'Las cajas están sostenidas firmemente, los cables están seguros y los accesorios de soporte son galvanizados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 105,
      nom: '314-24',
      tex: 'Profundidad de las cajas de salida',
      tip: 'O',
      cri: 'La profundidad mínima en las cajas instaladas es de 12.7 mm',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 106,
      nom: '314-27',
      tex: 'Cajas de salida para: alumbrado, piso y ventiladores de techo',
      tip: 'O',
      cri: 'Las cajas de salida para lámparas son las adecuadas y están certificadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 107,
      nom: '314-29',
      tex: 'Cajas y registros que deben ser accesibles',
      tip: 'O',
      cri: 'Las cajas están accesibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 108,
      nom: '314-30',
      tex: 'Registros',
      tip: 'O',
      cri: 'Los registros se deben diseñar e instalar para que resistan todas las cargas que probablemente se impongan sobre ellos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 109,
      nom: '314-40',
      tex: 'Cajas, cajas metálicas y accesorios',
      tip: 'O',
      cri: 'Las cajas son galvanizadas y de un espesor mínimo de 1.6 mm, están conectadas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 110,
      nom: '',
      tex: '312 Gabinetes, cajas de desconexión y bases para medidores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 111,
      nom: '312-3',
      tex: 'Posición en las paredes',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'El borde no está metido mas de 6.35 mm por debajo de la superficie, los gabinetes instalados están a nivel de la superficie, o sobresalen de la misma',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 112,
      nom: '312-4',
      tex: 'Reparación de las superficies no combustibles',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Las superficeis no combustibles que estén dañadas o incompletas se deben reparar para que no queden espacios abiertos ni separaciones mayores a 3 mm en el borde del gabinete o la caja de desconexión.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 113,
      nom: '312-5',
      tex: 'Conductores que entren en ,los gabinetes o cajas para corta circuitos',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión y están firmemente sujetos al gabinete',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 114,
      nom: '312-6 312-7',
      tex: 'Radio de curvatura de los conductores',
      tip: 'O',
      cri: 'Existe suficiente espacio para el alambrado y doblado de los cables',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 115,
      nom: '312-8',
      // tslint:disable-next-line: max-line-length
      tex: 'Envolventes para interruptores y dispositivos de protección contra sobrecorriente con empalmes, derivaciones y conductores de paso de alimentación',
      tip: 'O',
      cri: 'No se utilizan como cajas de empalme',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 116,
      nom: '',
      tex: '404 Des-conectadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 117,
      nom: '404-2 404-12',
      tex: 'Conexión de los des-conectadores Conexión a tierra',
      tip: 'O',
      cri: 'Las conexiones están hechas en los conductores de fase. Los gabinetes están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 118,
      nom: '',
      tex: '406 Contactos, Conectores de Cordón y Clavijas de Conexión.',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 119,
      nom: '406-4 a)',
      tex: 'De tipo de puesta a tierra',
      tip: 'O',
      cri: 'Los contactos que están instalados en circuitos derivados de 15y 20 Amperes son de tipo puesta a tierra.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 120,
      nom: '406-4 b)',
      tex: 'Puestos a tierra',
      tip: 'O',
      cri: 'Los contactos cuentan con un conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 121,
      nom: '406-5',
      tex: 'Montaje del contacto',
      tip: 'O',
      cri: 'Los contactos están firmemente en su lugar que les corresponde.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 122,
      nom: '406-9',
      tex: 'Contactos en lugares húmedos o mojados',
      tip: 'O',
      cri: 'El contacto exterior está protegido a prueba de intemperie',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 123,
      nom: '406-11',
      tex: 'Conexión de la terminal de puesta a tierra del contacto de la caja',
      tip: 'O',
      cri: 'La conexión de la terminal cumple con el 250-146',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 124,
      nom: '',
      tex: '408 Tableros de distribución y tableros de alumbrado y control',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 125,
      nom: '408-3 408-3 a) 1)',
      tex: 'Soportes e instalación de las barras colectoras y de los conductores Ubicación',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'No están sujetos a daño físico. No hay sobre-calentamiento. Tienen puente de unión. Las terminales son accesibles. Las fases están arregladas ABC del frente hacia atrás, de arriba hacia abajo o de izquierda a derecha. Hay suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 126,
      nom: '408-4 a)',
      tex: 'Directorio de circuitos o identificación de circuito',
      tip: 'O',
      cri: 'Cada circuito o modificación de circuito debe ser identificado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 127,
      nom: '408-20',
      tex: 'Ubicación de los tableros de distribución',
      tip: 'O',
      cri: 'Están ubicados en lugares permanentemente secos solo son accesibles a personas calificadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 128,
      nom: '408-17',
      tex: 'Ubicación con materiales fácilmente combustibles',
      tip: 'O',
      cri: 'Es un espacio dedicado, no hay probabilidad de que transmitan fuego a materiales combustibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 129,
      nom: '408-18',
      tex: 'Separaciones',
      tip: 'O',
      cri: 'El tablero esta separado 90 cm del techo combustible, existe espacio de trabajo suficiente alrededor del tablero',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 130,
      nom: '408-19',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Los cables dentro del tablero están aprobados y listados, son resistentes a la propagación de la flama',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 131,
      nom: '408-5',
      tex: 'Distancia para el conductor que entra en el envolvente de la barra conductora',
      tip: 'O',
      cri: 'Existe espacio suficiente que permite la instalación de los conductores en dichos envolventes, de acuerdo as la tabla 408-5',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 132,
      nom: '408-30 408-36',
      tex: 'Tableros de alumbrado y control, generalidades, protección contra sobre-corriente',
      tip: 'O',
      cri: 'Deben tener parámetros nominales no menores a los mínimos del alimentador. Protegidos individualmente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 133,
      nom: '408-50 408-51 408-52',
      tex: 'Paneles Barras colectoras Protección de los circuitos de instrumento',
      tip: 'O',
      cri: 'Están hechos de material no combustible Están rígidamente montadas Están protegidos con interruptores de 15 amperes.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 134,
      nom: '408-55',
      tex: 'Espacio de curvatura de alambre dentro de un envolvente que contiene un panel de alumbrado y control',
      tip: 'O',
      cri: 'Cuentan con espacio arriba y abajo para el doblez de los cables, tabla 312-6 a) y b)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 135,
      nom: '',
      tex: '410 Luminarias, portalámparas, lámparas y receptáculos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 136,
      nom: '410-5',
      tex: 'Partes vivas',
      tip: 'O',
      cri: 'Las luminarias están contenidos en una envolvente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 137,
      nom: '410-20',
      tex: 'Espacio para los conductores',
      tip: 'O',
      cri: 'Existe espacio suficiente para el acomodo de los conductores',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 138,
      nom: '410-21',
      tex: 'Limites de temperatura de los conductores en las cajas de salida',
      tip: 'O',
      cri: 'Las luminarias permiten la ventilación de los cables',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 139,
      nom: '410-24',
      tex: 'Conexión de las luminarias de descarga eléctrica y luminarias LED',
      tip: 'O',
      cri: 'Están conectadas con tubo conduit metálico flexible, las cajas de conexión están accesibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 140,
      nom: '410-30',
      tex: 'Soportes de las luminarias',
      tip: 'O',
      cri: 'Están firmemente sujetos al techo con canal, tirantes y cadena metálica',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 141,
      nom: '410-52',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Se utiliza aislamiento THWLS',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 142,
      nom: '410-74',
      tex: 'Capacidad nominal de las luminarias',
      tip: 'O',
      cri: 'Están debidamente identificados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 143,
      nom: '410-151',
      tex: 'Rieles de iluminación Instalación',
      tip: 'O',
      cri: 'Los rieles de iluminación deben estar instalados y conectados en forma permanente a un circuito derivado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 144,
      nom: '410-154',
      tex: 'Sujeción',
      tip: 'O',
      cri: 'Los rieles de iluminación se deben sujetar y asegurar , de modo que cada sujeción sea adecuada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 145,
      nom: '440-1 al 440-3',
      tex: 'Disposiciones generales',
      tip: 'O',
      cri: 'Están identificados los equipos sujetos a este articulo.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 146,
      nom: '440 – 4 a) b) c)',
      tex: 'Placa de datos de moto-compresores herméticos de refrigeración y equipos',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'La unidad cuenta con una placa de datos que identifica las características eléctricas del motor. Existe una protección contra corto circuito y sobrecarga. La capacidad del circuito derivado se selección con la corriente eléctrica de carga nominal de placa',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 147,
      nom: '440-12 a)',
      tex: 'Medios de desconexión. Capacidad nominal y capacidad de interrupción. Moto-compresor hermético de refrigeración',
      tip: 'O, A',
      // tslint:disable-next-line: max-line-length
      cri: 'El tamaño del controlador fue seleccionado en función de la corriente eléctrica del rotor bloqueado. Tablas 430-251A o 430-251B',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 148,
      nom: '440-21 al 440-22',
      tex: 'Protección de los circuitos derivados contra cortocircuito y falla a tierra. Requisitos generales. Aplicación y selección',
      tip: 'O, A',
      // tslint:disable-next-line: max-line-length
      cri: 'Están establecidos los requisitos para los dispositivos de protección contra sobre-corrientes debidas a corto circuito y falla a tierra. Soportan la corriente de arranque del motor y tiene un ajuste no mayor al 175% de la corriente eléctrica nominal',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 149,
      nom: '440-31 al 440-35',
      tex: 'Conductores del circuito derivado',
      tip: 'O',
      cri: 'El calibre de los conductores es adecuado y se basa en la información aplicable de la placa de datos.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 150,
      nom: '440-41',
      tex: 'Controladores para motores de compresor. Capacidad nominal',
      tip: 'O',
      cri: 'Los controladores tienen las capacidades nominales adecuadas. (datos de placa)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 151,
      nom: '440-60 al 440-65',
      tex: 'Requisitos para acondicionadores de aire para habitación',
      tip: 'O',
      // tslint:disable-next-line: max-line-length
      cri: 'Los conductores, toma corrientes, cordones y dispositivos de sobre-corriente para acondicionadores de aire de habitación están dimensionados apropiadamente.',
      obp: '',
      obs: '',
      cum: ''
    }
  ];
  // public currentD = '';
  // public client = {};
  public f11 = [
    {
      id_: 1,
      nom: '',
      tex: '110 Requisitos generales',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 2,
      nom: '110-2',
      tex: 'Aprobación',
      tip: 'O',
      cri: 'Los materiales y equipos utilizados están aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id_: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: ''
    }
  ];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private readonly offlineOnlineService: OfflineOnlineService
  ) {
    this.registerToEvents(offlineOnlineService);
    this.createDatabase();
  }

  AddClient(datos: Datos, costol: string) {
    const f = this.splitDate(datos.fechai);
    // const ff = datos.fechai.split('-');
    datos.dia = f.d;
    datos.mes = f.m;
    datos.anio = f.a;
    datos.date = Date.now();
    datos.costol = costol;
    const nClient = { datos };

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
    this.f10.forEach(item => {
      this.ft10List.push(item as F10);
      // console.log(item);
    });
  }
  addft81(fecha: string, id: number) {
    this.ft81List.push({
      id_: id, fecha: fecha, tipo: 'NOM', desc: 'INS', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: ''
    } as F081);
  }
  addft82(fecha: string, id: number) {
    this.ft82List.push({
      id_: id, fecha: fecha, tipo: 'PEC', desc: 'PRO', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: ''
    } as F081);
  }
  addft15(fecha: string, id: number) {
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
  }
  addft07(fecha: string, id: number) {
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
  }
  async addft07Offline(key: string, fecha: string, id: number) {
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
  }
  async addft15Offline(key: string, fecha: string, id: number) {
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
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: ''
    }
    );
  }
  async addft82Offline(key: string, fecha: string, id: number) {
    const ui = UUID.UUID();
    await this.localDb.ft82.add({
      id: ui, client: key, id_: id, fecha: fecha, tipo: 'PEC', desc: 'PRO', n1: 1,
      n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, d1: '', d2: '', d3: '', d4: '', d5: '', d6: '',
      nc1: '', nc2: '', nc3: '', nc4: '', nc5: '', nc6: '', fr1: '', fr2: '', fr3: '', fr4: '', fr5: '', fr6: '',
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', fs1: '', fs2: '', fs3: '', fs4: '', fs5: '', fs6: ''
    }
    );
  }

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

  async addRowFt10(f10: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.ft10List.push(f10 as F10);
    } else {
      const ui = UUID.UUID();
      await this.localDb.ft10.add({
        id: ui, client: key, id_: f10.id_, cri: f10.cri,
        cum: f10.cum, nom: f10.nom, obp: f10.obp,
        obs: f10.obs, tex: f10.tex, tip: f10.tip
      });
    }
  }

  updateRowFt10(f10: F10, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.f10Object.update({ nom: f10.nom, tex: f10.tex, tip: f10.tip, cri: f10.cri, obp: f10.obp, obs: f10.obs, cum: f10.cum });
    } else {
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
    }
  }

  Getf10(key: string) {
    this.ft10List = this.db.list('data/' + key + '/ft10', ref =>
      ref.orderByChild('id_')
    );
    return this.ft10List;
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
  }

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
          c.datos.instal = datos.instal;
          c.datos.ambien = datos.ambien;
          c.datos.memo = datos.memo;
          c.datos.nombreuv = datos.nombreuv;
          c.datos.logo = datos.logo;
          c.datos.dia = datos.dia;
          c.datos.mes = datos.mes;
          c.datos.anio = datos.anio;
          c.datos.fechai = datos.fechai;
          c.datos.fechaf = datos.fechaf;
          c.datos.cargouv = datos.cargouv;
        });
    }
  }

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

  getCurrentDataF10Row(key: string, key2: string) {
    this.f10Object = this.db.object('data/' + key + '/ft10/' + key2);
    return this.f10Object;
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
  }

  UpdateFt01(ft01: any, key: string) {
    if (this.offlineOnlineService.isOnline) {
      this.db.object('data/' + key + '/datos/')
        .update({ s1: ft01.s1, s2: ft01.s2, fpago: ft01.fpago, vigencia: ft01.vigencia, intro: ft01.intro });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.s1 = ft01.s1;
          client.datos.s2 = ft01.s2;
          client.datos.fpago = ft01.fpago;
          client.datos.vigencia = ft01.vigencia;
          client.datos.intro = ft01.intro;
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

  UpdateFt08INCIE1(f08: F081, key: string, type: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.f81Object.update({
        n1: f08.n1, n2: f08.n2, n3: f08.n3, n4: f08.n4, n5: f08.n5, n6: f08.n6,
        d1: f08.d1, d2: f08.d2, d3: f08.d3, d4: f08.d4, d5: f08.d5, d6: f08.d6,
        nc1: f08.nc1, nc2: f08.nc2, nc3: f08.nc3, nc4: f08.nc4, nc5: f08.nc5, nc6: f08.nc6,
        fr1: f08.fr1, fr2: f08.fr2, fr3: f08.fr3, fr4: f08.fr4, fr5: f08.fr5, fr6: f08.fr6,
        a1: f08.a1, a2: f08.a2, a3: f08.a3, a4: f08.a4, a5: f08.a5, a6: f08.a6,
        fs1: f08.fs1, fs2: f08.fs2, fs3: f08.fs3, fs4: f08.fs4, fs5: f08.fs5, fs6: f08.fs6
      });
    } else {
      if (type === 'NOM') {
        this.localDb.ft81.where('id').equals(key).modify(cc => {
          cc.n1 = f08.n1; cc.n2 = f08.n2; cc.n3 = f08.n3; cc.n4 = f08.n4; cc.n5 = f08.n5; cc.n6 = f08.n6;
          cc.d1 = f08.d1; cc.d2 = f08.d2; cc.d3 = f08.d3; cc.d4 = f08.d4; cc.d5 = f08.d5; cc.d6 = f08.d6;
          cc.nc1 = f08.nc1; cc.nc2 = f08.nc2; cc.nc3 = f08.nc3; cc.nc4 = f08.nc4; cc.nc5 = f08.nc5; cc.nc6 = f08.nc6;
          cc.fr1 = f08.fr1; cc.fr2 = f08.fr2; cc.fr3 = f08.fr3; cc.fr4 = f08.fr4; cc.fr5 = f08.fr5; cc.fr6 = f08.fr6;
          cc.a1 = f08.a1; cc.a2 = f08.a2; cc.a3 = f08.a3; cc.a4 = f08.a4; cc.a5 = f08.a5; cc.a6 = f08.a6;
          cc.fs1 = f08.fs1; cc.fs2 = f08.fs2; cc.fs3 = f08.fs3; cc.fs4 = f08.fs4; cc.fs5 = f08.fs5; cc.fs6 = f08.fs6;
        });
      }
      if (type === 'PEC') {
        this.localDb.ft82.where('id').equals(key).modify(cc => {
          cc.n1 = f08.n1; cc.n2 = f08.n2; cc.n3 = f08.n3; cc.n4 = f08.n4; cc.n5 = f08.n5; cc.n6 = f08.n6;
          cc.d1 = f08.d1; cc.d2 = f08.d2; cc.d3 = f08.d3; cc.d4 = f08.d4; cc.d5 = f08.d5; cc.d6 = f08.d6;
          cc.nc1 = f08.nc1; cc.nc2 = f08.nc2; cc.nc3 = f08.nc3; cc.nc4 = f08.nc4; cc.nc5 = f08.nc5; cc.nc6 = f08.nc6;
          cc.fr1 = f08.fr1; cc.fr2 = f08.fr2; cc.fr3 = f08.fr3; cc.fr4 = f08.fr4; cc.fr5 = f08.fr5; cc.fr6 = f08.fr6;
          cc.a1 = f08.a1; cc.a2 = f08.a2; cc.a3 = f08.a3; cc.a4 = f08.a4; cc.a5 = f08.a5; cc.a6 = f08.a6;
          cc.fs1 = f08.fs1; cc.fs2 = f08.fs2; cc.fs3 = f08.fs3; cc.fs4 = f08.fs4; cc.fs5 = f08.fs5; cc.fs6 = f08.fs6;
        });
      }
    }
  }

  UpdateFt07(f07: Ft7, key: string, type: string) {
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
  }


  /** Update dates */
  upfi(f: string, key: string) {
    const dd = this.splitDate(f);
    if (this.offlineOnlineService.isOnline) { // Online
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
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft02: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft02 = f;
        });
    }
  }
  upf03(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft03: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft03 = f;
        });
    }
  }
  upf05(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft05: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft05 = f;
        });
    }
  }
  upf06(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft06: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft06 = f;
        });
    }
  }
  upf09(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft09: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft09 = f;
        });
    }
  }
  upf10(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft10: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft10 = f;
        });
    }
  }
  upf11(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ fft11: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.fft11 = f;
        });
    }
  }
  upfc07(f: string, key: string) {
    if (this.offlineOnlineService.isOnline) { // Online
      this.db.object('data/' + key + '/datos/')
        .update({ ffc07: f });
    } else {
      this.localDb.clients // Offline
        .where('id').equals(key).modify(client => {
          client.datos.ffc07 = f;
        });
    }
  }
  upft07(f: string, key: string, key2: string) {  // Online
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
  }

  /** IndexedDB Offline */

  private registerToEvents(onlineOfflineService: OfflineOnlineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
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
      ft07: 'id, client',
      ft15: 'id, client',
      ft81: 'id, client',
      ft82: 'id, client',
      ft10: 'id, client, id_'
    });
  }

  private addToIndexedDb(client: Client) {
    this.localDb.clients
      .add(client)
      .then(async () => {
        const allItems: Client[] = await this.localDb.clients.toArray();
        console.log('saved in DB, DB is now', allItems);
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
        const f07Items = await this.localDb.ft07.where('client').equals(item.id).toArray();
        if (f07Items.length > 0) { item.ft07 = f07Items; }
        const f15Items = await this.localDb.ft15.where('client').equals(item.id).toArray();
        if (f15Items.length > 0) { item.ft15 = f15Items; }
        const f81Items = await this.localDb.ft81.where('client').equals(item.id).toArray();
        if (f81Items.length > 0) { item.ft81 = f81Items; }
        const f82Items = await this.localDb.ft82.where('client').equals(item.id).toArray();
        if (f82Items.length > 0) { item.ft82 = f82Items; }
        this.dataList.push(item);
        console.log(`item ${item.id} sent and deleted locally`);
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
