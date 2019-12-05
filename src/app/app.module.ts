import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaratulaComponent } from './components/caratula/caratula.component';
import { PanelComponent } from './components/panel/panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientComponent } from './components/client/client.component';
import { Fc07Component } from './components/fc07/fc07.component';
import { Ft05Component } from './components/ft05/ft05.component';
import { Ft02Component } from './components/ft02/ft02.component';
import { Ft09Component } from './components/ft09/ft09.component';
import { Ft06Component } from './components/ft06/ft06.component';
import { Ft03Component } from './components/ft03/ft03.component';
import { Ft01Component } from './components/ft01/ft01.component';
import { Ft11Component } from './components/ft11/ft11.component';
import { Ft08incie1Component } from './components/ft08incie1/ft08incie1.component';

import { environment } from '../environments/environment';
import { Ft10Component } from './components/ft10/ft10.component';
import { RowComponent } from './components/ft10/row/row.component';
import { EditFt10Component } from './components/edit-ft10/edit-ft10.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { MainComponent } from './components/main/main.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { Ft07Component } from './components/ft07/ft07.component';
import { EditCotizacionComponent } from './components/edit-cotizacion/edit-cotizacion.component';
import { Nft06Component } from './components/nft06/nft06.component';
import { Row6Component } from './components/nft06/row6/row6.component';
import { EditFt06Component } from './components/edit-ft06/edit-ft06.component';
import { ListaComponent } from './components/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    CaratulaComponent,
    PanelComponent,
    NavbarComponent,
    ClientComponent,
    Fc07Component,
    Ft05Component,
    Ft02Component,
    Ft09Component,
    Ft06Component,
    Ft03Component,
    Ft01Component,
    Ft11Component,
    Ft08incie1Component,
    Ft10Component,
    RowComponent,
    EditFt10Component,
    EditClientComponent,
    MainComponent,
    CotizacionComponent,
    Ft07Component,
    EditCotizacionComponent,
    Nft06Component,
    Row6Component,
    EditFt06Component,
    ListaComponent
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
    DataTablesModule,
    Ng2ImgMaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
