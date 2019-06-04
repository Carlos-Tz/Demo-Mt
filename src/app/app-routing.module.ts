import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePortraitComponent } from './components/page-portrait/page-portrait.component';
import { PageLandscapeComponent } from './components/page-landscape/page-landscape.component';
import { FtCerounoComponent } from './components/ft-cerouno/ft-cerouno.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: PagePortraitComponent},
  {path: 'landscape', component: PageLandscapeComponent},
  {path: 'ft-01', component: FtCerounoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
