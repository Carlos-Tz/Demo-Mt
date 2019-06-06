import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePortraitComponent } from './components/page-portrait/page-portrait.component';
import { PageLandscapeComponent } from './components/page-landscape/page-landscape.component';
import { FtCerounoComponent } from './components/ft-cerouno/ft-cerouno.component';
import { FcCerosieteComponent } from './components/fc-cerosiete/fc-cerosiete.component';
import { FtCerodosComponent } from './components/ft-cerodos/ft-cerodos.component';
import { FtCerotresComponent } from './components/ft-cerotres/ft-cerotres.component';
import { FtCerocincoComponent } from './components/ft-cerocinco/ft-cerocinco.component';
import { FtCeronueveComponent } from './components/ft-ceronueve/ft-ceronueve.component';
import { FtCeroochoincie1Component } from './components/ft-ceroochoincie1/ft-ceroochoincie1.component';
import { FtCeroochoincie2Component } from './components/ft-ceroochoincie2/ft-ceroochoincie2.component';
import { FtCeroochoincpeComponent } from './components/ft-ceroochoincpe/ft-ceroochoincpe.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: PagePortraitComponent},
  {path: 'landscape', component: PageLandscapeComponent},
  {path: 'ft-01', component: FtCerounoComponent},
  {path: 'fc-07', component: FcCerosieteComponent},
  {path: 'ft-02', component: FtCerodosComponent},
  {path: 'ft-03', component: FtCerotresComponent},
  {path: 'ft-05', component: FtCerocincoComponent},
  {path: 'ft-09', component: FtCeronueveComponent},
  {path: 'ft-08INCIE1', component: FtCeroochoincie1Component},
  {path: 'ft-08INCIE2', component: FtCeroochoincie2Component},
  {path: 'ft-08INCPE', component: FtCeroochoincpeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
