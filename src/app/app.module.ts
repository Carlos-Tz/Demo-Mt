import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagePortraitComponent } from './components/page-portrait/page-portrait.component';
import { PageLandscapeComponent } from './components/page-landscape/page-landscape.component';
import { CaratulaComponent } from './components/caratula/caratula.component';
import { PanelComponent } from './components/panel/panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientComponent } from './components/client/client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { Fc07Component } from './components/fc07/fc07.component';
import { Ft05Component } from './components/ft05/ft05.component';
import { Ft02Component } from './components/ft02/ft02.component';
import { Ft09Component } from './components/ft09/ft09.component';
import { Ft06Component } from './components/ft06/ft06.component';
import { Ft03Component } from './components/ft03/ft03.component';
import { Ft01Component } from './components/ft01/ft01.component';
import { Ft11Component } from './components/ft11/ft11.component';
import { Ft08incie1Component } from './components/ft08incie1/ft08incie1.component';
import { Ft08incie2Component } from './components/ft08incie2/ft08incie2.component';
import { Ft08incpeComponent } from './components/ft08incpe/ft08incpe.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PagePortraitComponent,
    PageLandscapeComponent,
    CaratulaComponent,
    PanelComponent,
    NavbarComponent,
    ClientComponent,
    AddClientComponent,
    Fc07Component,
    Ft05Component,
    Ft02Component,
    Ft09Component,
    Ft06Component,
    Ft03Component,
    Ft01Component,
    Ft11Component,
    Ft08incie1Component,
    Ft08incie2Component,
    Ft08incpeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
