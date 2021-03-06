import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { Ft01Component } from './components/ft01/ft01.component';
import { Fc07Component } from './components/fc07/fc07.component';
import { Ft02Component } from './components/ft02/ft02.component';
import { Ft03Component } from './components/ft03/ft03.component';
import { Ft05Component } from './components/ft05/ft05.component';
import { Ft09Component } from './components/ft09/ft09.component';
import { Ft08incie1Component } from './components/ft08incie1/ft08incie1.component';
import { Ft11Component } from './components/ft11/ft11.component';
import { Ft06Component } from './components/ft06/ft06.component';
import { CaratulaComponent } from './components/caratula/caratula.component';
import { ClientComponent } from './components/client/client.component';
import { Ft10Component } from './components/ft10/ft10.component';
import { EditFt10Component } from './components/edit-ft10/edit-ft10.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { MainComponent } from './components/main/main.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { Ft07Component } from './components/ft07/ft07.component';
import { EditCotizacionComponent } from './components/edit-cotizacion/edit-cotizacion.component';
import { Nft06Component } from './components/nft06/nft06.component';
import { EditFt06Component } from './components/edit-ft06/edit-ft06.component';
import { ListaComponent } from './components/lista/lista.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: MainComponent},
  {path: 'ft-01/:key', component: Ft01Component},
  {path: 'fc-07/:key', component: Fc07Component},
  {path: 'ft-02/:key', component: Ft02Component},
  {path: 'ft-03/:key', component: Ft03Component},
  {path: 'ft-05/:key', component: Ft05Component},
  {path: 'ft-09/:key', component: Ft09Component},
  /* {path: 'ft-081/:key/:key2/:type', component: Ft08incie1Component}, */
  {path: 'ft-08/:key/:type', component: Ft08incie1Component},
  {path: 'ft-11/:key', component: Ft11Component},
  {path: 'ft-10/:key', component: Ft10Component},
  {path: 'ft-10/:key/:key2', component: EditFt10Component},
  {path: 'ft-06/:key', component: Ft06Component},
  /* {path: 'ft-06/:key', component: Nft06Component},
  {path: 'ft-06/:key/:key2', component: EditFt06Component}, */
  /* {path: 'ft-07/:key/:key2/:type', component: Ft07Component}, */
  {path: 'ft-07/:key/:type', component: Ft07Component},
  {path: 'panel', component: ListaComponent},
  {path: 'panel/:key', component: PanelComponent},
  {path: 'nuevo', component: CotizacionComponent},
  {path: 'cliente/:key', component: ClientComponent},
  {path: 'edit-client/:key', component: EditClientComponent},
  {path: 'edit-coti/:key', component: EditCotizacionComponent},
  {path: 'caratula/:key', component: CaratulaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
