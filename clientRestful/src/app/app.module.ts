import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { HTTP } from '@ionic-native/http/ngx';
import { UiService } from './services/ui.service';
import { FormPage } from './form/form.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupPage } from './form-group/form-group.page';

@NgModule({
  declarations: [AppComponent, FormPage, FormGroupPage],
  entryComponents: [FormPage, FormGroupPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [
    ApiService,
    UiService,
    HTTP,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
