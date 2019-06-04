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

@NgModule({
  declarations: [
    AppComponent,
    PagePortraitComponent,
    PageLandscapeComponent,
    ContentComponent,
    CaratulaComponent,
    FcCerosieteComponent,
    FtCerounoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
