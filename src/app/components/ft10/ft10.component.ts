import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';

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
  public f10 = [
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
      cum: 'si'
    }, {
      id: 3,
      nom: '110-3 b)',
      tex: 'Evaluación, identificación, instalación y uso del equipo',
      tip: '',
      cri: 'De acuerdo con las instrucciones incluidas en la etiqueta y/o instalación',
      obp: '',
      obs: '',
      cum: 'no'
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
    }
  ];
  public page0 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  public page = ['pal1', 'pal2', 'pal3', 'pal4', 'pal5', 'pal6', 'pal7', 'pal8', 'pal9', 'pal10', 'pal11', 'pal12', 'pal13', 'pal14', 'pal 15', 'pal 16', 'pal 17', 'pal 18', 'pl 19'];
  public page1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public page2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public page3 = [1, 2, 3, 4, 5, 6];

  constructor(
    private clientApi: ClientService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clientApi.clientObject) {
      this.clientApi.clientObject.valueChanges().subscribe(data => {
        this.client = data;
      });
    }
  }

  goBack = () => {
    this.location.back();
  }
}
