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
import { Datos } from '../models/datos';
import { F10 } from '../models/f10';
/* import { F082 } from '../models/f082';
import { F08E } from '../models/f08-e'; */

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //public clientsList: AngularFireList<any>;
  public dataList: AngularFireList<any>;
  public ft10List: AngularFireList<any>;
  public ft10: F10[];
  public clientObject: AngularFireObject<any>;
  public f10Object: AngularFireObject<any>;
  public f10 = [
    {
      id: 1,
      nom: '',
      tex: '110 Requisitos generales',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 2,
      nom: '110-2',
      tex: 'Aprobación',
      tip: 'O',
      cri: 'Los materiales y equipos utilizados están aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 4,
      nom: '110-7',
      tex: 'Integridad de aislamiento',
      tip: 'O,M',
      cri: 'El sistema esta libre de corto circuito y de conexiones a tierra por falla. PEC5.1',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 5,
      nom: '110-9',
      tex: 'Corriente de interrupción',
      tip: 'O',
      cri: 'Los interruptores tienen un rango de operación suficiente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 6,
      nom: '110-12',
      tex: 'Ejecución mecánica de los trabajos',
      tip: 'O',
      cri: 'Los equipos están instalados de manera limpia y profesional',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 7,
      nom: '10-12 a )',
      tex: 'Aberturas no utilizadas',
      tip: 'O',
      cri: 'Las aberturas no utilizadas en las canalizaciones están cerradas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 8,
      nom: '110-13',
      tex: 'Montaje y enfriamiento del equipo',
      tip: 'O',
      cri: 'El equipo esta montado de manera segura, anclado y el espacio de ventilación es adecuado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 9,
      nom: '110-14 a ) 110-14 b) 110-14 c )',
      tex: 'Conexiones eléctricas terminales y empalmes Limitaciones de temperatura',
      tip: 'O',
      cri: 'Los conductores esta conectados con dispositivos adecuados El conductor no excede la temperatura de operación de terminales del equipo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 10,
      nom: '110-16',
      tex: 'Señales de advertencia contra arco eléctrico',
      tip: '',
      cri: 'Los tableros de distribución, tableros de control industrial, envolventes para medidores enchufables y centros de control de motores, deben estar marcados para advertir del peligro potencial de arco eléctrico',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 11,
      nom: '110-26',
      tex: 'Espacio de trabajo',
      tip: 'O',
      cri: 'Alrededor del equipo existe suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 12,
      nom: '110-22',
      tex: 'Identificación de los medios de desconexión',
      tip: 'O',
      cri: 'Los medios de desconexión están identificados indicando su propósito',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 13,
      nom: '110-31',
      tex: 'Envolventes de las instalaciones eléctricas',
      tip: '',
      cri: 'Cuando el acceso sea controlado, solo deben ser accesibles por personal calificado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 14,
      nom: '',
      tex: '210 Circuitos derivados',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 15,
      nom: '210-3',
      tex: 'Clasificación',
      tip: 'O',
      cri: 'Los circuitos están clasificados según la capacidad de conducción de corriente máxima ó según el valor de la protección',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 16,
      nom: '210-5',
      tex: 'Identificación de los circuitos derivados',
      tip: 'O',
      cri: 'El conductor de puesto a tierra es blanco y el de puesta a tierra es desnudo y verde, las fases de color diferente, como, azul, negra, roja',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 17,
      nom: '210-19 210-20',
      tex: 'Conductores tamaño nominal Protección contra sobre-corriente',
      tip: 'O',
      cri: 'El tamaño de conductores corresponde con la carga y están protegidos contra sobre-corriente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 18,
      nom: '210-21 210-24',
      tex: 'Dispositivos de salida Requisitos de los circuitos derivados- resumen',
      tip: 'O',
      cri: 'Los circuitos tienen las capacidades nominales permitidas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 19,
      nom: '220-12',
      tex: 'Cargas de alumbrado para lugares especificos',
      tip: 'O',
      cri: 'Los circuitos están previstos para las cargas calculadas, según 220-12',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 20,
      nom: '210-23',
      tex: 'Cargas permisibles',
      tip: 'D',
      cri: 'Los circuitos alimentan las cargas permisibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 21,
      nom: '',
      tex: '215 Alimentadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 22,
      nom: '215-2',
      tex: 'Capacidad nominal y tamaño mínimo del conductor',
      tip: 'O',
      cri: 'Los alimentadores tienen el tamaño mínimo requerido',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 23,
      nom: '215-3 220-12',
      tex: 'Protección contra sobre-corriente Capacidad de conducción de corriente',
      tip: 'O',
      cri: 'El interruptor y el conductor son del tamaño adecuado para las cargas continuas y no continuas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 24,
      nom: '220-12 220-61',
      tex: 'Capacidad de conducción de corriente Carga del neutro del alimentador',
      tip: 'D',
      cri: 'Los conductores son adecuados para la carga',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 25,
      nom: '215-5',
      tex: 'Diagrama Unifilar de Alimentadores',
      tip: 'O',
      cri: 'Contenga M2 , carga conectada, FD, datos conductor, %e, canalizaciones',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 26,
      nom: '215-10 230-95',
      tex: 'Protección a tierra Protección del equipo contra falla a tierra',
      tip: 'O',
      cri: 'Los interruptores deben tener protección de falla a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 27,
      nom: '',
      tex: '225 Circuitos Derivados y Alimentadores Exteriores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 28,
      nom: '225-10 225-20 225-22',
      tex: 'Alambrado de los edificios Protección mecánica de los conductores Canalizaciones sobre las superficies externas de las construcciones',
      tip: 'O',
      cri: 'Se permiten diferentes métodos de alambrado que protejan a los conductores contras daño mecánico, en exterior deben ser herméticas a la lluvia',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 29,
      nom: '225-15 225-18',
      tex: 'Soporte sobre edificios Libramiento para conductores y cables aéreos',
      tip: 'O',
      cri: 'Conductores apoyados en estructuras sólidas Para diferentes condiciones la altura varía de 3.0 a 5.5 M',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 30,
      nom: '240-4 240-21 240-21 b) 1)',
      tex: 'Protección de los conductores Ubicación en el circuito Derivaciones no mayores a 3.0 m de largo',
      tip: 'O',
      cri: 'Los conductores están debidamente protegidos por interruptores conectados al inicio y en cada conductor de fase',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 31,
      nom: '',
      tex: '230 Acometidas',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 32,
      nom: '230-8',
      tex: 'Aplicado de Selladores en las canalizaciones',
      tip: 'O',
      cri: 'La canalización subterránea esta sellada en ambos extremos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 33,
      nom: '230-24 230-26 230-27',
      tex: 'Libramientos Punto de sujeción Medios de sujeción',
      tip: 'O',
      cri: 'Entre los conductores de acometida existen distancias adecuadas de seguridad y no son fácilmente accesibles. Están firmemente sujetos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 34,
      nom: '230-32 230-50 a)',
      tex: 'Protección contra daños Protección contra daño físico en acometidas subterráneos',
      tip: 'O',
      cri: 'La acometida subterránea está protegida y a una profundidad de 50 CM',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 35,
      nom: '230-23 230-31 230-42',
      tex: 'Tamaño y ampacidad del conductor',
      tip: 'O',
      cri: 'Las capacidades nominales y calibres de los conductores son los adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 36,
      nom: '230-82 250-24 b)',
      tex: 'Equipo conectado en el lado línea del medio de desconexión de los conductores de recepción del suministro',
      tip: 'O',
      cri: 'Los gabinetes y partes metálicas del equipo de acometida están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 37,
      nom: '230-24 230-208 230-66',
      tex: 'Espacio de trabajo Requisitos de protección contra sobrecorriente Marcado',
      tip: 'O',
      cri: 'Existe espacio de trabajo alrededor del equipo de acometida. El interruptor tiene la capacidad interruptiva adecuada. El equipo está aprobado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 38,
      nom: '230-79 230-80',
      tex: 'Capacidad del equipo de desconexión Capacidades combinadas de los medios de desconexión',
      tip: 'O',
      cri: 'Las capacidades nominales de los medios de desconexión son las adecuadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 39,
      nom: '',
      tex: '240 Protección contra Sobrecorriente',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 40,
      nom: '240-4',
      tex: 'Protección de los conductores',
      tip: 'O',
      cri: 'Los conductores están protegidos contra sobrecorriente de acuerdo a su ampacidad',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 41,
      nom: '240-12',
      tex: 'Coordinación del sistema eléctrico',
      tip: 'O',
      cri: 'Existe una coordinación de protecciones contra cortocircuito.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 42,
      nom: '240-15',
      tex: 'Conductores de fase',
      tip: 'O',
      cri: 'Existen dispositivos de protección contra sobrecorriente requerido.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 43,
      nom: '240-21',
      tex: 'Ubicación en el circuito',
      tip: 'O',
      cri: 'Existe la protección contra sobrecorriente en cada conductor de fase de circuito.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 44,
      nom: '240-30 a)',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los dispositivos de sobrecorriente están protegidos contra daño físico.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 45,
      nom: '240-83 c)',
      tex: 'Valor nominal de interrupción',
      tip: 'O',
      cri: 'Todos los interruptores están marcados su valor nominal de interrupción.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 46,
      nom: '240-90',
      tex: 'General',
      tip: 'O',
      cri: 'Las protecciones contra sobrecorriente en las áreas industriales están supervisadas.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 47,
      nom: '240-100',
      tex: 'Alimentadores y circuitos derivados',
      tip: 'O',
      cri: 'Cuentan todos los alimentadores y circuitos derivados con su protección contra sobrecorriente.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 48,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 49,
      nom: '250-24',
      tex: 'Puesta a tierra de sistemas de corriente alterna alimentados por una acometida',
      tip: 'O',
      cri: 'Se tiene un conductor de puesta a tierra conectado al conductor puesto a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 50,
      nom: '250-28',
      tex: 'Puente unión principal y puente de unión del sistema',
      tip: 'O',
      cri: 'Son de material resistente a la corrosión, barra, conductor o tornillo, tamaño acorde a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 51,
      nom: '250-80 250-92',
      tex: 'Canalizaciones y envolventes de acometida. Unión de equipos de acometidas',
      tip: 'O',
      cri: 'Las partes metálicas no conductoras están conectadas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 52,
      nom: '250-50',
      tex: 'Sistema de electrodos de puesta a tierra',
      tip: 'O',
      cri: 'La tubería de agua y estructura metálica del edificio son electrodos y electrodos prefabricados pueden usarse en el sistema de electrodos y deben interconectarse entre si, los diferentes sistemas de tierra deben conectarse entre si',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 53,
      nom: '250-53',
      tex: 'Instalación del sistema de electrodo de puesta a tierra',
      tip: 'O',
      cri: 'Existen electrodos especialmente construidos, como: varilla, tubería de agua, placas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 54,
      nom: '250-66',
      tex: 'Tamaño del conductor del electrodo de puesta atierra de corriente alterna',
      tip: 'O, D',
      cri: 'Se especificó de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 55,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de la acometida',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 56,
      nom: '250-64',
      tex: 'Instalación del conductor del electrodo de puesta a tierra.',
      tip: 'O',
      cri: 'Los conductores de puesta a tierra están firmemente sujetos, protegidos y asegurados contra daño físico, son eléctricamente continuos y están conectados con materiales aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 57,
      nom: '250-68',
      tex: 'Conexión del conductor del electrodo de puesta a tierra y del puente de unión',
      tip: 'O',
      cri: 'Las conexiones a los electrodos están accesibles y aseguran una puesta a tierra eficaz. Existen puentes de unión',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 58,
      nom: '250-70',
      tex: 'Métodos de conexión del conductor de puesta a tierra y de unión a los electrodos',
      tip: 'O',
      cri: 'La conexión esta hecha con soldadura exotérmica, zapatas, conectores a presión, abrazaderas u otros medios aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 59,
      nom: '250-52',
      tex: 'Electrodos de puesta a tierra',
      tip: 'O',
      cri: 'La tubería metálica de agua y las armazones estructurales están conectadas equipotencialmente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 60,
      nom: '250-168',
      tex: 'Puente de unión del sistema corriente continua',
      tip: 'O',
      cri: 'Existe un puente de unión principal, sin empalmes, que conecta al conductor de puesta a tierra de equipo y el envolvente del medio de desconexión de la acometida al conductor puesto a tierra del sistema',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 61,
      nom: '250-92 b) 250-102',
      tex: 'Método de unión en la acometida Conductores y puente del equipo',
      tip: 'O',
      cri: 'Las canalizaciones y gabinetes del equipo de acometida están conectados equipotencialmente en forma correcta.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 62,
      nom: '250-28 d) 1) 250-24 c)',
      tex: 'Puente de unión principal y puente de unión del sistema. Tamaño nominal. Conductor puesto a tierra llevado al equipo de acometida',
      tip: 'O',
      cri: 'Verificar que el calibre del conductor de puesta a tierra del electrodo, en la acometida este de acuerdo a la tabla 250-66',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 63,
      nom: '250-30',
      tex: 'Pues a tierra de sistemas de CA derivados separados',
      tip: 'O',
      cri: 'Revisar que los sistemas derivados independientemente tengan electrodos de puesta a tierra, conductores de electrodos de puesta a tierra y puentes de conexión equipotencial adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 64,
      nom: '',
      tex: '250 Puesta a tierra Conexión equipotencial de equipos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 65,
      nom: '250-118',
      tex: 'Tipos de conductores de puesta a tierra de equipos',
      tip: 'O',
      cri: 'Cobre o aluminio, tubo conduit metálico, en c/derivado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 66,
      nom: '250-146',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja',
      tip: 'O',
      cri: 'Verificar que la terminal de puesta a tierra del contacto este conectada a la caja metálica',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 67,
      nom: '250-96 250-28 348-60 350-60',
      tex: 'Unión con otras envolventes. Puente de unión principal y del puente de unión del sistema. Tubo conduit metálico flexible Puesta a tierra y unión. Tubo conduit flexible metálico y no metálico',
      tip: 'O',
      cri: 'Verificar que las partes metálicas no conductoras estén conectadas a tierra con accesorios adecuados y aprobados, que los cables de puesta a tierra del electrodo y del equipo sean de cobre y de acuerdo a las tablas 250-66 y 250-122',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 68,
      nom: '408-40',
      tex: 'Puesta a tierra de los tableros de alumbrado y control',
      tip: 'O',
      cri: 'Los tableros de alumbrado y control están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 69,
      nom: '250-142',
      tex: 'Uso del conductor de puesto a tierra del circuito para puesta a tierra de equipos',
      tip: 'O',
      cri: 'Lado suministro: se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra Lado de la carga: no se permite utilizar el conductor puesto a tierra como conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 70,
      nom: '250-146 406-3 d)',
      tex: 'Conexión de la terminal de puesta a tierra del contacto a la caja Contactos con puesta a tierra aislada',
      tip: '',
      cri: 'Los contactos de tierra aislada están identificados con un triángulo naranja y los conductores de puesta a tierra son aislados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 71,
      nom: '',
      tex: '300 Métodos de Alambrado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 72,
      nom: '300-3 a), b) y c) 1) 2)',
      tex: 'Conductores',
      tip: 'O',
      cri: 'Los conductores, individuales, del mismo circuito y de menos de 600 V, están instalados en canalizaciones metálicas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 73,
      nom: '300-4',
      tex: 'Protección contra daño físico',
      tip: 'O',
      cri: 'Los conductores están separados de los bordes de las canalizaciones metálicas y están protegidos contra tornillos y clavos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 74,
      nom: '300-4 g)',
      tex: 'Accesorios aislados',
      tip: 'O',
      cri: 'Las boquillas de las canalizaciones tienen una superficie lisa y redondeada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 75,
      nom: '300-3 2)',
      tex: 'Conductores de puesta a tierra y de unión',
      tip: 'O',
      cri: 'Se permitirá que los conductores de puesta atierra de equipos estén instalados afuera de la canalización o del ensamble de cable, si están de acuerdo con las disposiciones de 250-130 c)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 76,
      nom: '300-10',
      tex: 'Continuidad eléctrica de las canalizaciones y envolventes metálicas',
      tip: 'O',
      cri: 'Las canalizaciones, cajas y gabinetes metálicos están unidos mecánicamente y tienen continuidad eléctrica',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 77,
      nom: '300-11',
      tex: 'Aseguramiento y soportes.',
      tip: 'O',
      cri: 'Las canalizaciones, cajas, gabinetes, cables y accesorios están firmemente sujetos y soportadas en su lugar , no se usan como medios de soporte',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 78,
      nom: '300-13',
      tex: 'Continuidad mecánica y eléctrica de los conductores',
      tip: 'O',
      cri: 'Los conductores son continuos entre las cajas, registros y gabinetes, no existen empalmes',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 79,
      nom: '300-14',
      tex: 'Longitud de los conductores libres en las salidas',
      tip: 'O',
      cri: 'Existen 15 cm de longitud adicional en las cajas y puntos de conexión',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 80,
      nom: '300-15',
      tex: 'Cajas o accesorios, cuando se requieren',
      tip: 'O',
      cri: 'Están instaladas cajas en los puntos de conexión, empalme, salida y alambrado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 81,
      nom: '300-17',
      tex: 'Número y tamaño de los conductores en una canalización',
      tip: 'O',
      cri: 'La ocupación de los conductores en las canalizaciones, es la correcta',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 82,
      nom: '300-18',
      tex: 'Instalación de canalizaciones',
      tip: 'O',
      cri: 'Las canalizaciones están instaladas de manera completa, antes de cablear',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 83,
      nom: '300-21',
      tex: 'Propagación de fuego o de productos de la combustión',
      tip: 'O',
      cri: 'Las aberturas alrededor de los elementos eléctricos que pasan a través de paredes, pisos o techos resistentes al fuego están protegidas contra el fuego por métodos adecuados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 84,
      nom: '',
      tex: '392 Charolas Portacables',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 85,
      nom: '392-18',
      tex: 'Instalación de charolas portacables',
      tip: 'O',
      cri: 'El sistema esta instalado de manera completa, no están instalados cables de mas de 600 v con otros de menor voltaje, están separadas 60 cm de otras tuberías de servicios',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 86,
      nom: '392-60',
      tex: 'Puesta a tierra y Unión',
      tip: 'O',
      cri: 'Está provista de un conductor de puesta a tierra en toda la longitud de la charola y este esta conectado a la misma cada 15 m con un accesorio compatible con el material de la charola',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 87,
      nom: '392-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      cri: 'Los empalmes no sobresalen los rieles laterales; los cables o sus conjuntos están fijos firmemente, los cables del 4 al 4/0 están colocados en una sola capa;',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 88,
      nom: '392-22',
      tex: 'Número de cables multiconductores de 2000 v nominales o menos en soportes tipo charola portacables',
      tip: 'O',
      cri: 'La suma de los diámetros de todos los cables no supera el ancho de la charola para cables de 4/0 o mayores; para cables menores a 4/0 la suma de las áreas no debe superar la superficie máxima permisible en la tabla 318-9. Ver las demás condiciones',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 89,
      nom: '392-22 a)',
      tex: 'Número de cables monoconductores ≤ 2000 V',
      tip: 'O',
      cri: 'Se acepta si están uniformemente distribuidos a lo ancho y hay espacio entre ellos, ver tabla 392-22 a)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 90,
      nom: '392-22 c)',
      tex: 'Número de cables de media tensión y tipo MC de (más de 2000 volts) en charolas portacables',
      tip: 'O',
      cri: 'Cables mono-conductores en grupos de tres, cuatro están instalados en una sola capa y la suma de los diámetros de los cables agrupados no exceden el ancho de la charola',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 91,
      nom: '',
      tex: '358 Tubo conduit metáico ligero tipo EMT',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 92,
      nom: '358-10',
      tex: 'Usos permitidos',
      tip: 'O',
      cri: 'Se utiliza en instalaciones interiores ocultas y expuestas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 93,
      nom: '358-20',
      tex: 'Tamaño',
      tip: 'O',
      cri: 'Diámetro: Mínimo 16 mm (1/2”), Máximo 103 mm (4”)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 94,
      nom: '358-22',
      tex: 'Número de conductores',
      tip: '',
      cri: 'La ocupación de los conductores de acuerdo a la tabla 1, capitulo 10',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 95,
      nom: '358-28 358-42',
      tex: 'Desbastado y roscado Coples y conectores',
      tip: 'O',
      cri: 'El tubo instalado no está roscado, no hay bordes en sus extremos, los acoplamientos y accesorios están firmemente sujetos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 96,
      nom: '358-24 358-26',
      tex: 'Dobleces Número de curvas',
      tip: 'O',
      cri: 'En las curvas el tubo no ha sufrido daños. El radio de curvatura esta hecho de acuerdo a la tabla 2 capitulo 10. No existen mas de 4 dobleces de un cuadrante de (360ª en total)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 97,
      nom: '358-30',
      tex: 'Sujeción y soporte',
      tip: 'O',
      cri: 'Está sujeto firmemente por menos cada tres metros y no mayor de 90 cm de cada caja de salida',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 98,
      nom: '',
      tex: '314 Cajas, cajas de paso y sus accesorios, utilizados para salida, empalme, unión o jalado',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 99,
      nom: '314-4',
      tex: 'Cajas metálicas',
      tip: 'O',
      cri: 'Las cajas metálicas están puestas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 100,
      nom: '314-16',
      tex: 'Número de conductores en las cajas de salida, de dispositivos y de unión y en las cajas de paso',
      tip: 'O',
      cri: 'Existe suficiente espacio para los conductores en las cajas y condulets',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 101,
      nom: '314-17 314-17 a)',
      tex: 'Conductores que entran en cajas, cajas de paso o accesorios',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión. Las aberturas no utilizadas están cerradas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 102,
      nom: '314-20',
      tex: 'En la pared o el plafón',
      tip: 'O',
      cri: 'Las cajas instaladas en paredes o los plafones no quede a más de 6 mm dentro de la superficie terminada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 103,
      nom: '314-21',
      tex: 'Reparación de superficies incombustibles',
      tip: 'O',
      cri: 'No existen espacios ni separaciones mayores que 3 mm en el borde de la caja.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 104,
      nom: '314-23',
      tex: 'Soportes',
      tip: 'O',
      cri: 'Las cajas están sostenidas firmemente, los cables están seguros y los accesorios de soporte son galvanizados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 105,
      nom: '314-24',
      tex: 'Profundidad de las cajas de salida',
      tip: 'O',
      cri: 'La profundidad mínima en las cajas instaladas es de 12.7 mm',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 106,
      nom: '314-27',
      tex: 'Cajas de salida para: alumbrado, piso y ventiladores de techo',
      tip: 'O',
      cri: 'Las cajas de salida para lámparas son las adecuadas y están certificadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 107,
      nom: '314-29',
      tex: 'Cajas y registros que deben ser accesibles',
      tip: 'O',
      cri: 'Las cajas están accesibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 108,
      nom: '314-30',
      tex: 'Registros',
      tip: 'O',
      cri: 'Los registros se deben diseñar e instalar para que resistan todas las cargas que probablemente se impongan sobre ellos',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 109,
      nom: '314-40',
      tex: 'Cajas, cajas metálicas y accesorios',
      tip: 'O',
      cri: 'Las cajas son galvanizadas y de un espesor mínimo de 1.6 mm, están conectadas a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 110,
      nom: '',
      tex: '312 Gabinetes, cajas de desconexión y bases para medidores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 111,
      nom: '312-3',
      tex: 'Posición en las paredes',
      tip: 'O',
      cri: 'El borde no está metido mas de 6.35 mm por debajo de la superficie, los gabinetes instalados están a nivel de la superficie, o sobresalen de la misma',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 112,
      nom: '312-4',
      tex: 'Reparación de las superficies no combustibles',
      tip: 'O',
      cri: 'Las superficeis no combustibles que estén dañadas o incompletas se deben reparar para que no queden espacios abiertos ni separaciones mayores a 3 mm en el borde del gabinete o la caja de desconexión.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 113,
      nom: '312-5',
      tex: 'Conductores que entren en ,los gabinetes o cajas para corta circuitos',
      tip: 'O',
      cri: 'Los conductores están protegidos contra la abrasión y están firmemente sujetos al gabinete',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 114,
      nom: '312-6 312-7',
      tex: 'Radio de curvatura de los conductores',
      tip: 'O',
      cri: 'Existe suficiente espacio para el alambrado y doblado de los cables',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 115,
      nom: '312-8',
      tex: 'Envolventes para interruptores y dispositivos de protección contra sobrecorriente con empalmes, derivaciones y conductores de paso de alimentación',
      tip: 'O',
      cri: 'No se utilizan como cajas de empalme',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 116,
      nom: '',
      tex: '404 Des-conectadores',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 117,
      nom: '404-2 404-12',
      tex: 'Conexión de los des-conectadores Conexión a tierra',
      tip: 'O',
      cri: 'Las conexiones están hechas en los conductores de fase. Los gabinetes están conectados a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 118,
      nom: '',
      tex: '406 Contactos, Conectores de Cordón y Clavijas de Conexión.',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 119,
      nom: '406-4 a)',
      tex: 'De tipo de puesta a tierra',
      tip: 'O',
      cri: 'Los contactos que están instalados en circuitos derivados de 15y 20 Amperes son de tipo puesta a tierra.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 120,
      nom: '406-4 b)',
      tex: 'Puestos a tierra',
      tip: 'O',
      cri: 'Los contactos cuentan con un conductor de puesta a tierra',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 121,
      nom: '406-5',
      tex: 'Montaje del contacto',
      tip: 'O',
      cri: 'Los contactos están firmemente en su lugar que les corresponde.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 122,
      nom: '406-9',
      tex: 'Contactos en lugares húmedos o mojados',
      tip: 'O',
      cri: 'El contacto exterior está protegido a prueba de intemperie',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 123,
      nom: '406-11',
      tex: 'Conexión de la terminal de puesta a tierra del contacto de la caja',
      tip: 'O',
      cri: 'La conexión de la terminal cumple con el 250-146',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 124,
      nom: '',
      tex: '408 Tableros de distribución y tableros de alumbrado y control',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 125,
      nom: '408-3 408-3 a) 1)',
      tex: 'Soportes e instalación de las barras colectoras y de los conductores Ubicación',
      tip: 'O',
      cri: 'No están sujetos a daño físico. No hay sobre-calentamiento. Tienen puente de unión. Las terminales son accesibles. Las fases están arregladas ABC del frente hacia atrás, de arriba hacia abajo o de izquierda a derecha. Hay suficiente espacio de trabajo',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 126,
      nom: '408-4 a)',
      tex: 'Directorio de circuitos o identificación de circuito',
      tip: 'O',
      cri: 'Cada circuito o modificación de circuito debe ser identificado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 127,
      nom: '408-20',
      tex: 'Ubicación de los tableros de distribución',
      tip: 'O',
      cri: 'Están ubicados en lugares permanentemente secos solo son accesibles a personas calificadas',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 128,
      nom: '408-17',
      tex: 'Ubicación con materiales fácilmente combustibles',
      tip: 'O',
      cri: 'Es un espacio dedicado, no hay probabilidad de que transmitan fuego a materiales combustibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 129,
      nom: '408-18',
      tex: 'Separaciones',
      tip: 'O',
      cri: 'El tablero esta separado 90 cm del techo combustible, existe espacio de trabajo suficiente alrededor del tablero',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 130,
      nom: '408-19',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Los cables dentro del tablero están aprobados y listados, son resistentes a la propagación de la flama',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 131,
      nom: '408-5',
      tex: 'Distancia para el conductor que entra en el envolvente de la barra conductora',
      tip: 'O',
      cri: 'Existe espacio suficiente que permite la instalación de los conductores en dichos envolventes, de acuerdo as la tabla 408-5',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 132,
      nom: '408-30 408-36',
      tex: 'Tableros de alumbrado y control, generalidades, protección contra sobre-corriente',
      tip: 'O',
      cri: 'Deben tener parámetros nominales no menores a los mínimos del alimentador. Protegidos individualmente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 133,
      nom: '408-50 408-51 408-52',
      tex: 'Paneles Barras colectoras Protección de los circuitos de instrumento',
      tip: 'O',
      cri: 'Están hechos de material no combustible Están rígidamente montadas Están protegidos con interruptores de 15 amperes.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 134,
      nom: '408-55',
      tex: 'Espacio de curvatura de alambre dentro de un envolvente que contiene un panel de alumbrado y control',
      tip: 'O',
      cri: 'Cuentan con espacio arriba y abajo para el doblez de los cables, tabla 312-6 a) y b)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 135,
      nom: '',
      tex: '410 Luminarias, portalámparas, lámparas y receptáculos',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 136,
      nom: '410-5',
      tex: 'Partes vivas',
      tip: 'O',
      cri: 'Las luminarias están contenidos en una envolvente',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 137,
      nom: '410-20',
      tex: 'Espacio para los conductores',
      tip: 'O',
      cri: 'Existe espacio suficiente para el acomodo de los conductores',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 138,
      nom: '410-21',
      tex: 'Limites de temperatura de los conductores en las cajas de salida',
      tip: 'O',
      cri: 'Las luminarias permiten la ventilación de los cables',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 139,
      nom: '410-24',
      tex: 'Conexión de las luminarias de descarga eléctrica y luminarias LED',
      tip: 'O',
      cri: 'Están conectadas con tubo conduit metálico flexible, las cajas de conexión están accesibles',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 140,
      nom: '410-30',
      tex: 'Soportes de las luminarias',
      tip: 'O',
      cri: 'Están firmemente sujetos al techo con canal, tirantes y cadena metálica',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 141,
      nom: '410-52',
      tex: 'Aislamiento de los conductores',
      tip: 'O',
      cri: 'Se utiliza aislamiento THWLS',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 142,
      nom: '410-74',
      tex: 'Capacidad nominal de las luminarias',
      tip: 'O',
      cri: 'Están debidamente identificados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 143,
      nom: '410-151',
      tex: 'Rieles de iluminación Instalación',
      tip: 'O',
      cri: 'Los rieles de iluminación deben estar instalados y conectados en forma permanente a un circuito derivado',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 144,
      nom: '410-154',
      tex: 'Sujeción',
      tip: 'O',
      cri: 'Los rieles de iluminación se deben sujetar y asegurar , de modo que cada sujeción sea adecuada',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 145,
      nom: '440-1 al 440-3',
      tex: 'Disposiciones generales',
      tip: 'O',
      cri: 'Están identificados los equipos sujetos a este articulo.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 146,
      nom: '440 – 4 a) b) c)',
      tex: 'Placa de datos de moto-compresores herméticos de refrigeración y equipos',
      tip: 'O',
      cri: 'La unidad cuenta con una placa de datos que identifica las características eléctricas del motor. Existe una protección contra corto circuito y sobrecarga. La capacidad del circuito derivado se selección con la corriente eléctrica de carga nominal de placa',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 147,
      nom: '440-12 a)',
      tex: 'Medios de desconexión. Capacidad nominal y capacidad de interrupción. Moto-compresor hermético de refrigeración',
      tip: 'O, A',
      cri: 'El tamaño del controlador fue seleccionado en función de la corriente eléctrica del rotor bloqueado. Tablas 430-251A o 430-251B',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 148,
      nom: '440-21 al 440-22',
      tex: 'Protección de los circuitos derivados contra cortocircuito y falla a tierra. Requisitos generales. Aplicación y selección',
      tip: 'O, A',
      cri: 'Están establecidos los requisitos para los dispositivos de protección contra sobre-corrientes debidas a corto circuito y falla a tierra. Soportan la corriente de arranque del motor y tiene un ajuste no mayor al 175% de la corriente eléctrica nominal',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 149,
      nom: '440-31 al 440-35',
      tex: 'Conductores del circuito derivado',
      tip: 'O',
      cri: 'El calibre de los conductores es adecuado y se basa en la información aplicable de la placa de datos.',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 150,
      nom: '440-41',
      tex: 'Controladores para motores de compresor. Capacidad nominal',
      tip: 'O',
      cri: 'Los controladores tienen las capacidades nominales adecuadas. (datos de placa)',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 151,
      nom: '440-60 al 440-65',
      tex: 'Requisitos para acondicionadores de aire para habitación',
      tip: 'O',
      cri: 'Los conductores, toma corrientes, cordones y dispositivos de sobre-corriente para acondicionadores de aire de habitación están dimensionados apropiadamente.',
      obp: '',
      obs: '',
      cum: ''
    }
  ];
  //public currentD = '';
 // public client = {};
  public f11 = [
    {
      id: 1,
      nom: '',
      tex: '110 Requisitos generales',
      tip: '',
      cri: '',
      obp: '',
      obs: '',
      cum: 'si'
    }, {
      id: 2,
      nom: '110-2',
      tex: 'Aprobación',
      tip: 'O',
      cri: 'Los materiales y equipos utilizados están aprobados',
      obp: '',
      obs: '',
      cum: ''
    }, {
      id: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: ''
    }
  ];
  constructor(private db: AngularFireDatabase, private router: Router) { }

  AddClient(datos: Datos, fecha: Fecha, signs: Signs, logo: string, costol: string) {    
    datos.dia = fecha.dia;
    datos.mes = fecha.mes;
    datos.anio = fecha.anio;
    datos.fechai = fecha.fecha;
    datos.s1 = signs.s1;
    datos.s2 = signs.s2;
    datos.s3 = signs.s3;
    datos.date = Date.now();
    datos.logo = logo;
    datos.costol = costol;
    let nClient = { datos };
    this.dataList.push(nClient as Client);
  }

  addft10() {
    this.f10.forEach(item => {
     this.ft10List.push(item as F10);
     //console.log(item);
    });
  }

  addRowFt10(f10: object) {
    this.ft10List.push(f10 as F10);
  }

  updateRowFt10(f10: F10) {
    this.f10Object.update({ nom: f10.nom, tex: f10.tex, tip: f10.tip, cri: f10.cri, obp: f10.obp, obs: f10.obs, cum: f10.cum });
  }

   Getf10(key: string) {
    this.ft10List = this.db.list('data/' + key + '/ft10', ref =>
      ref.orderByChild('id')
    );
    return this.ft10List;
  }

  updateClient(datos: Datos, key: string) {
    this.db.object('data/' + key)
    .update({datos});
  }

  /* Getft10List(key: string) {
    this.clientApi.GetDataList().snapshotChanges().subscribe(re => {
      this.dataList = [];
      re.forEach(item => {
        const surv = item.payload.toJSON();
        surv['$key'] = item.key;
        this.dataList.push(surv as Client);
      });
      this.data_ = true;
    });

    this.ft10List = this.db.list('data/' + key + '/ft10', ref =>
      ref.orderByChild('id')
    );
    this.ft10List.snapshotChanges().subscribe(re => {
      this.ft10 = [];
      re.forEach(it => {
        const f = it.payload.toJSON();
      });
    });
    return this.ft10List;
  } */

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

  getCurrentDataF10Row(key: string, key2: string) {
    this.f10Object = this.db.object('data/' + key + '/ft10/' + key2);
    return this.f10Object;
  }

  UpdateFt05(f05: F05, key: string) {
    this.db.object('data/' + key)
    .update({ ft05: f05 });
  }

  UpdateFt06(f06: F06, key: string) {
    this.db.object('data/' + key)
    .update({ ft06: f06 });
  }

  UpdateFc07(f07: F07, key: string) {
    this.db.object('data/' + key)
    .update({ fc07: f07 });
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
