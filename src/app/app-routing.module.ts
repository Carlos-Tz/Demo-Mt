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
import { Ft08incie2Component } from './components/ft08incie2/ft08incie2.component';
import { Ft08incpeComponent } from './components/ft08incpe/ft08incpe.component';
import { Ft11Component } from './components/ft11/ft11.component';
import { Ft06Component } from './components/ft06/ft06.component';
import { CaratulaComponent } from './components/caratula/caratula.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientComponent } from './components/client/client.component';
import { Ft10Component } from './components/ft10/ft10.component';
import { EditFt10Component } from './components/edit-ft10/edit-ft10.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: PanelComponent},
  {path: 'ft-01/:key', component: Ft01Component},
  {path: 'fc-07/:key', component: Fc07Component},
  {path: 'ft-02/:key', component: Ft02Component},
  {path: 'ft-03/:key', component: Ft03Component},
  {path: 'ft-05/:key', component: Ft05Component},
  {path: 'ft-09/:key', component: Ft09Component},
  {path: 'ft-08INCIE1/:key', component: Ft08incie1Component},
  {path: 'ft-08INCIE2/:key', component: Ft08incie2Component},
  {path: 'ft-08INCPE/:key', component: Ft08incpeComponent},
  {path: 'ft-11/:key', component: Ft11Component},
  {path: 'ft-10/:key', component: Ft10Component},
  {path: 'ft-10/:key/:key2', component: EditFt10Component},
  {path: 'ft-06/:key', component: Ft06Component},
  {path: 'panel', component: PanelComponent},
  {path: 'nuevo', component: AddClientComponent},
  {path: 'cliente/:key', component: ClientComponent},
  {path: 'edit-client/:key', component: EditClientComponent},
  {path: 'caratula/:key', component: CaratulaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
