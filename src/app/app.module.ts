import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagePortraitComponent } from './components/page-portrait/page-portrait.component';
import { PageLandscapeComponent } from './components/page-landscape/page-landscape.component';
import { ContentComponent } from './components/content/content.component';
import { CaratulaComponent } from './components/caratula/caratula.component';
import { FcCerosieteComponent } from './components/fc-cerosiete/fc-cerosiete.component';
import { FtCerounoComponent } from './components/ft-cerouno/ft-cerouno.component';
import { FtCerodosComponent } from './components/ft-cerodos/ft-cerodos.component';
import { FtCerotresComponent } from './components/ft-cerotres/ft-cerotres.component';
import { FtCerocincoComponent } from './components/ft-cerocinco/ft-cerocinco.component';
import { FtCeronueveComponent } from './components/ft-ceronueve/ft-ceronueve.component';
import { FtCeroochoincie1Component } from './components/ft-ceroochoincie1/ft-ceroochoincie1.component';
import { FtCeroochoincie2Component } from './components/ft-ceroochoincie2/ft-ceroochoincie2.component';
import { FtCeroochoincpeComponent } from './components/ft-ceroochoincpe/ft-ceroochoincpe.component';

@NgModule({
  declarations: [
    AppComponent,
    PagePortraitComponent,
    PageLandscapeComponent,
    ContentComponent,
    CaratulaComponent,
    FcCerosieteComponent,
    FtCerounoComponent,
    FtCerodosComponent,
    FtCerotresComponent,
    FtCerocincoComponent,
    FtCeronueveComponent,
    FtCeroochoincie1Component,
    FtCeroochoincie2Component,
    FtCeroochoincpeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
