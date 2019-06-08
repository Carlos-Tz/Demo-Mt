import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePortraitComponent } from './components/page-portrait/page-portrait.component';
import { PageLandscapeComponent } from './components/page-landscape/page-landscape.component';
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

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: CaratulaComponent},
  {path: 'landscape', component: PageLandscapeComponent},
  {path: 'ft-01', component: Ft01Component},
  {path: 'fc-07', component: Fc07Component},
  {path: 'ft-02', component: Ft02Component},
  {path: 'ft-03', component: Ft03Component},
  {path: 'ft-05', component: Ft05Component},
  {path: 'ft-09', component: Ft09Component},
  {path: 'ft-08INCIE1', component: Ft08incie1Component},
  {path: 'ft-08INCIE2', component: Ft08incie2Component},
  {path: 'ft-08INCPE', component: Ft08incpeComponent},
  {path: 'ft-11', component: Ft11Component},
  {path: 'ft-06', component: Ft06Component},
  {path: 'panel', component: PanelComponent},
  {path: 'nuevo', component: AddClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
